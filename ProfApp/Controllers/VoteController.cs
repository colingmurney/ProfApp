using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using ProfApp.Models;
using RecLeagueAPI.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace ProfApp.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class VoteController : ControllerBase
    {
        private readonly ProfAppContext _context;
        private readonly IWebHostEnvironment _hostEnvironment;
        private readonly string _secret;

        public VoteController(ProfAppContext context, IConfiguration config, IWebHostEnvironment hostEnvironment)
        {
            _context = context;
            _hostEnvironment = hostEnvironment;
            _secret = config.GetValue<string>("TokenKey");
        }

        [HttpPost("upvote")]
        public async Task<ActionResult> Upvote(int postId)
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
                return Unauthorized("Invalid access token.");
            }
            try
            {
                Downvote downvote = await _context.Downvotes.SingleOrDefaultAsync(d => d.PostId == postId && d.StudentId == student.StudentId);

                if (downvote != null) _context.Downvotes.Remove(downvote);

                //create new upvote obj with postId, student.studentId, and current datetime
                Upvote upvote = new Upvote()
                {
                    PostId = postId,
                    StudentId = student.StudentId,
                    Date = DateTime.Now
                };

                _context.Upvotes.Add(upvote);
                await _context.SaveChangesAsync();

                //create new jwt and attach to response
                //var tokenString = JwtAuthentication.CreateJWT(_secret, student.Email);
                //Response.Cookies.Append("X-Access-Token", tokenString, new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.Strict });

                return Ok("Upvote successful");
            } 
            
            catch(DbUpdateException ex)
            {
                return BadRequest(ex.InnerException.ToString());
            }
        }

        [HttpPost("downvote")]
        public async Task<ActionResult> Downvote(int postId)
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
                return Unauthorized("Invalid access token.");
            }
            try
            {
                Upvote upvote = await _context.Upvotes.SingleOrDefaultAsync(d => d.PostId == postId && d.StudentId == student.StudentId);

                if (upvote != null) _context.Upvotes.Remove(upvote);

                //create new upvote obj with postId, student.studentId, and current datetime
                Downvote downvote = new Downvote()
                {
                    PostId = postId,
                    StudentId = student.StudentId,
                    Date = DateTime.Now
                };

                _context.Downvotes.Add(downvote);
                await _context.SaveChangesAsync();

                //create new jwt and attach to response
                //var tokenString = JwtAuthentication.CreateJWT(_secret, student.Email);
                //Response.Cookies.Append("X-Access-Token", tokenString, new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.Strict });

                return Ok("Downvote successful");
            }

            catch (DbUpdateException ex)
            {
                return BadRequest(ex.InnerException.ToString());
            }
        }

    }
}
