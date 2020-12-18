using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace RecLeagueAPI.Helpers
{
    public class JwtAuthentication
    {
		public static string claimType = "email";

		public static bool ValidateCurrentToken(string token, string secret)
		{
			try
			{
				var key = Encoding.ASCII.GetBytes(secret);

				var tokenHandler = new JwtSecurityTokenHandler();
				SecurityToken validatedToken = null;

				tokenHandler.ValidateToken(token, new TokenValidationParameters
				{
                    ValidateIssuerSigningKey = true,
					IssuerSigningKey = new SymmetricSecurityKey(key),
					ValidateIssuer = false,
					ValidateAudience = false,
					// set clockskew to zero so tokens expire exactly at token expiration time (instead of 5 minutes later)
					ClockSkew = TimeSpan.Zero
				}, out validatedToken) ;
			}
			catch (SecurityTokenException)
			{
				return false;
			}
			catch (Exception e)
			{
                Console.WriteLine(e.ToString()); 
				throw;
			}
			return true;
		}

		public static string GetClaim(string token, string claimType)
		{
			var tokenHandler = new JwtSecurityTokenHandler();
			var securityToken = tokenHandler.ReadToken(token) as JwtSecurityToken;

			var stringClaimValue = securityToken.Claims.First(claim => claim.Type == claimType).Value;
			return stringClaimValue;
		}

		public static string CreateJWT(string tokenKey, string email)
        {
			var tokenHandler = new JwtSecurityTokenHandler();
			var key = Encoding.ASCII.GetBytes(tokenKey);
			var tokenDescriptor = new SecurityTokenDescriptor
			{
				Subject = new ClaimsIdentity(new Claim[]
				{
					new Claim(ClaimTypes.Email, email)
				}),
				Expires = DateTime.UtcNow.AddHours(1),
				SigningCredentials = new SigningCredentials(
					new SymmetricSecurityKey(key),
					SecurityAlgorithms.HmacSha256Signature)
			};
			var token = tokenHandler.CreateToken(tokenDescriptor);

			return tokenHandler.WriteToken(token);
		}

        internal static bool ValidateCurrentToken(Task<string> accessToken, object tokenKey)
        {
            throw new NotImplementedException();
        }
    }
}
