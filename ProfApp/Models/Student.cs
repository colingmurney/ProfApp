using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProfApp.Models
{
    [Table("Student")]
    public class Student
    {
        // params MUST be camel-case version of Pascal-case property name or a constructor error will occur
        public Student(string firstName, string lastName, string email, string password, string salt, bool rememberMe)
        {
            FirstName = firstName;
            LastName = lastName;
            Email = email;
            Password = password;
            Salt = salt;
            RememberMe = rememberMe;
        }

        [Key]
        public int StudentId { get; set; }
        [Required]
        [StringLength(25)]
        public string FirstName { get; set; }
        [Required]
        [StringLength(25)]
        public string LastName { get; set; }
        [Required]
        [StringLength(50)]
        public string Email { get; set; }
        [Required]
        [StringLength(255)]
        public string Password { get; set; }
        [Required]
        [StringLength(25)]
        public string Salt { get; set; }
        public bool RememberMe { get; set; }
    }
}
