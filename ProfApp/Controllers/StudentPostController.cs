using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using ProfApp.Models;
using RecLeagueAPI.Helpers;
using System;
using System.Collections.Generic;
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

            if (post.ImageFile != null)
            {
                post.Attachment = await SaveImage(post.ImageFile, dateTime);
            }

            _context.Posts.Add(post);
            await _context.SaveChangesAsync();

            return Ok("Post Successfully Uploaded");
        }

        
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult> GetAllPosts()
        {
            // check if access token was passed
            var accessToken = await HttpContext.GetTokenAsync("access_token");
            if (accessToken == null)
            {
                try
                {
                    List<NotSignedInPosts> posts = await _context.NotSignedInPosts.FromSqlRaw("EXECUTE dbo.GetPostsNotSignedIn").ToListAsync();

                    foreach (NotSignedInPosts post in posts)
                    {
                        post.Attachment = Path.GetFileName(post.Attachment);
                        post.ImageSrc = String.Format("{0}://{1}{2}/Files/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, Path.GetFileName(post.Attachment));
                    }

                    return Ok(posts);

                }
                catch (InvalidCastException e)
                {
                    return BadRequest(e);
                }
            } else
            {
                // check if claim == player in the database
                var claimEmail = JwtAuthentication.GetClaim(accessToken, JwtAuthentication.claimType);
                Student student = await _context.Students.SingleOrDefaultAsync(x => x.Email == claimEmail);
                if (student == null) return Unauthorized("Player was not found.");

                // check for wrong token key or expired token
                if (!JwtAuthentication.ValidateCurrentToken(accessToken, _secret))
                {
                    return Unauthorized("Invalid access token.");
                }

                var studentId = new SqlParameter("StudentId", student.StudentId);
                List<SignedInPosts> posts = await _context.SignedInPosts.FromSqlRaw("EXECUTE dbo.GetPostsSignedIn @StudentId", studentId).ToListAsync();

                //loop through list and modify properties
                foreach (SignedInPosts post in posts)
                {
                    post.Attachment = Path.GetFileName(post.Attachment);
                    post.ImageSrc = String.Format("{0}://{1}{2}/Files/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, Path.GetFileName(post.Attachment));
                }

                return Ok(posts);
            }
        }

        [HttpGet("single")]
        [AllowAnonymous]
        public async Task<ActionResult> GetPost([FromQuery(Name = "postId")] int postId)
        {
            try
            {
                var post = await _context.Posts.SingleOrDefaultAsync(x => x.PostId == postId);
                if (post == null)
                {
                    return BadRequest("Invalid postId");
                }

                var filename = Path.GetFileName(post.Attachment);
                post.Attachment = filename;
                post.ImageSrc = String.Format("{0}://{1}{2}/Files/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, filename);
                
                return Ok(post);

            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpGet("search-preview")]
        [AllowAnonymous]
        public async Task<ActionResult> searchPreview([FromQuery(Name = "search")] string searchInput)
        {
            try
            {
                var searchInputParam = new SqlParameter("SearchInput", searchInput);
                List<SearchPreviewResults> posts = await _context.SearchPreviewResults.FromSqlRaw("EXECUTE dbo.SearchPreviewResults @SearchInput", searchInputParam).ToListAsync();
                return Ok(posts);
            }
            catch (InvalidCastException e)
            {
                return BadRequest(e);
            }
        }

        [NonAction]
        public async Task<string> SaveImage(IFormFile imageFile, DateTime datetime)
        {
            string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName).ToArray()).Replace(' ', '-'); //.Take(10) after ToArray
            string extension = Path.GetExtension(imageFile.FileName);
            imageName = imageName + '_' + datetime.ToString("yymmss") + extension;

            string imagePath;
            if (extension == ".jpeg" | extension == ".jpg" | extension == ".png")
            {
                imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "Files", "Images", imageName);
            } else
            {
                imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "Files", "Pdf", imageName);
            }
            
            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }
            return imagePath;
        }

        //[NonAction]
        //public void ModifyPosts(List<NotSignedInPosts> posts)
        //{
            
        //    foreach (NotSignedInPosts post in posts)
        //    {
        //        post.Attachment = Path.GetFileName(post.Attachment);
        //        post.ImageSrc = String.Format("{0}://{1}{2}/Files/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, Path.GetFileName(post.Attachment));
        //    }
        //}
    }
}
