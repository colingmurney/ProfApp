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
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace ProfApp.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ProfController : ControllerBase
    {
        private readonly ProfAppContext _context;
        private readonly string _secret;

        public ProfController(ProfAppContext context, IConfiguration config)
        {
            _context = context;
            _secret = config.GetValue<string>("TokenKey");
        }

        [HttpGet]
        public async Task<ActionResult> GetProfs()
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

            List<Prof> profs = await _context.Profs.ToListAsync();
            //var profIdsAndNames = new List<Tuple<int, string>>();

            //foreach (Prof prof in profs)
            //{
            //    profIdsAndNames.Add(new Tuple<int, string>(prof.ProfId, prof.ProfFirstName + ' ' + prof.ProfLastName));
            //}

            //return Ok(profIdsAndNames);

            var profIdsAndNames = new List<ProfIdsAndNames>();

            foreach (Prof prof in profs)
            {
                profIdsAndNames.Add(new ProfIdsAndNames(prof.ProfId, prof.ProfFirstName + ' ' + prof.ProfLastName));
            }

            return Ok(profIdsAndNames);
        }

        public struct ProfIdsAndNames
        {
            public ProfIdsAndNames(int id, string name)
            {
                Id = id.ToString();
                Name = name;
            }

            public string Id { get; private set; }
            public string Name { get; private set; }
        }


    }
}
