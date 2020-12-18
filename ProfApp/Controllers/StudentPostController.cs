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
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace ProfApp.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class StudentPostController : ControllerBase
    {
        private readonly ProfAppContext _context;
        private readonly IWebHostEnvironment _hostEnvironment;
        private readonly string _secret;

        public StudentPostController(ProfAppContext context, IConfiguration config, IWebHostEnvironment hostEnvironment)
        {
            _context = context;
            _hostEnvironment = hostEnvironment;
            _secret = config.GetValue<string>("TokenKey");
        }

        [HttpPost("upload")]
        public async Task<ActionResult> Upload([FromForm] Post post)
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

            var dateTime = DateTime.Now;
            post.StudentId = student.StudentId;
            post.Date = dateTime;

            post.Attachment = await SaveImage(post.ImageFile, dateTime);
            _context.Posts.Add(post);
            await _context.SaveChangesAsync();

            return Ok("Post Successfully Uploaded");
        }

        [NonAction]
        public async Task<string> SaveImage(IFormFile imageFile, DateTime datetime)
        {
            string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName).ToArray()).Replace(' ', '-'); //.Take(10) after ToArray
            imageName = imageName + '_' + datetime.ToString("yymmss") + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "Files", "Images", imageName);
            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }
            return imagePath;
        }

    }
}
