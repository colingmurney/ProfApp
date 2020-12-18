using System.ComponentModel.DataAnnotations;


namespace ProfApp.Models
{
    public class LoginCredentials
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public bool RememberMe { get; set; }
    }
}