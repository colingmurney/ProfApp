using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using ProfApp.Models;
using RecLeagueAPI.Helpers;
using System;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace ProfApp.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class AuthenticationController : ControllerBase
    {
        private readonly ProfAppContext _context;
        //private readonly IConfiguration _config;
        private readonly string _secret;

        public AuthenticationController(ProfAppContext context, IConfiguration config)
        {
            _context = context;
            _secret = config.GetValue<string>("TokenKey");
            //_config = config;
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<ActionResult> Login(LoginCredentials login)
        {
            // check student credentials and return jwt if successful

            // emails are stored in lowecase and case insensitive
            login.Email = login.Email.ToLower();

            // validate credentials before autheniticating student ***** REPLACE WITH REAL VALIDATION
            if (string.IsNullOrEmpty(login.Email) || string.IsNullOrEmpty(login.Password))
                return BadRequest("Email or password is empty.");

            // check if student with provided email exists
            Student student = await _context.Students.SingleOrDefaultAsync(x => x.Email == login.Email);
            if (student == null) return BadRequest("Incorrect username/password.");

            // hash provided password with salt
            byte[] salt = Convert.FromBase64String(student.Salt);
            var hashed = HashPassword(salt, login.Password);

            // check if password providec is correct
            if (hashed != student.Password) return BadRequest("Incorrect username/password.");

            // update student isSignedIn attribute if box checked on login
            if (login.RememberMe)
            {
                student.RememberMe = true;
                _context.SaveChanges();
            }

            // create jwt and attach to response
            var tokenString = JwtAuthentication.CreateJWT(_secret, student.Email);
            Response.Cookies.Append("X-Access-Token", tokenString, new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.Strict });

            return Ok("Student SignIn Successful");
        }

        [HttpPost("signup")]
        [AllowAnonymous]
        public async Task<ActionResult> CreateAccount(AccountCredentials account)
        {
            // check account provided crendentials and create a new account
            // if successful, return jwt

            // emails are stored in lowecase and case insensitive
            account.Email = account.Email.ToLower();

            // validate credentials before autheniticating account ***** REPLACE WITH REAL VALIDATION
            if (string.IsNullOrEmpty(account.Email) || string.IsNullOrEmpty(account.Password) || string.IsNullOrEmpty(account.FirstName) || string.IsNullOrEmpty(account.LastName))
                return BadRequest();

            // check if the passwords provided match
            if (account.Password != account.ConfirmPassword) return BadRequest("Passwords do not match.");

            // check if a account with the provided email already exists
            Student student = await _context.Students.SingleOrDefaultAsync(x => x.Email == account.Email);
            if (student != null) return BadRequest("account with email already exists.");

            // generate a 128-bit salt using a secure PRNG
            byte[] salt = new byte[128 / 8];
            using (var rng = RandomNumberGenerator.Create()) { rng.GetBytes(salt); }

            // hash password and add new account to DB
            var hashed = HashPassword(salt, account.Password);
            Student newStudent = new Student(account.FirstName, account.LastName, account.Email, hashed, Convert.ToBase64String(salt), account.RememberMe);
            _context.Students.Add(newStudent);
            await _context.SaveChangesAsync();

            // create jwt and attach to response
            var tokenString = JwtAuthentication.CreateJWT(_secret, newStudent.Email);
            Response.Cookies.Append("X-Access-Token", tokenString, new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.Strict });

            return Ok("New account created.");
        }

        [HttpGet]
        public async Task<ActionResult> Authenitcate()
        {
            // check if access token was passed
            var accessToken = await HttpContext.GetTokenAsync("access_token");
            if (accessToken == null) return Unauthorized("No access token received.");

            // check if claim == player in the database
            var claimEmail = JwtAuthentication.GetClaim(accessToken, JwtAuthentication.claimType);
            Student student = await _context.Students.SingleOrDefaultAsync(x => x.Email == claimEmail);
            if (student == null) return Unauthorized("Player was not found.");

            // check for wrong token key or expired token
            if (!JwtAuthentication.ValidateCurrentToken(accessToken, _secret))
            {
                //if not valid, check if player has staySignedIn checked in the Player table
                if (student.RememberMe == false)
                    return Unauthorized("Invalid access token.");
            }

            //create new jwt and attach to response
            var tokenString = JwtAuthentication.CreateJWT(_secret, student.Email);
            Response.Cookies.Append("X-Access-Token", tokenString, new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.Strict });

            return Ok();
        }

        [HttpPut("logout")]
        public async Task<ActionResult> Logout()
        {
            // logout user by removing jwt in their browser

            //check if jwt claim == to a Player in the DB
            var accessToken = await HttpContext.GetTokenAsync("access_token");
            var claimEmail = JwtAuthentication.GetClaim(accessToken, JwtAuthentication.claimType);
            Student student = await _context.Students.SingleOrDefaultAsync(x => x.Email == claimEmail);
            if (student == null) return Unauthorized("Could not logout player.");
            if (!JwtAuthentication.ValidateCurrentToken(accessToken, _secret)) return Unauthorized("Invalid access token.");

            // reset Player staySignedIn attribute in DB and delete cookie
            student.RememberMe = false;
            _context.SaveChanges();
            Response.Cookies.Delete("X-Access-Token");

            return Ok("Player successfully logged out.");
        }

        public string HashPassword(byte[] salt, string password)
        {
            string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
            password: password,
            salt: salt,
            prf: KeyDerivationPrf.HMACSHA1,
            iterationCount: 10000,
            numBytesRequested: 256 / 8));

        return hashed;
        }
    }
}
