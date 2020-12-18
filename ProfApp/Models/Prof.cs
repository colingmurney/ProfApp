using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProfApp.Models
{
    [Table("Prof")]
    public class Prof
    {
        [Key]
        public int ProfId { get; set; }
        [Required]
        [StringLength(25)]
        public string ProfFirstName { get; set; }
        [Required]
        [StringLength(25)]
        public string ProfLastName { get; set; }
        

        // Foreign Keys
        [ForeignKey("School")]
        public int SchoolId { get; set; }
        public School School { get; set; }
    }
}
