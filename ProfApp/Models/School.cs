using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProfApp.Models
{
    [Table("School")]
    public class School
    {
        [Key]
        public int SchoolId { get; set; }
        [Required]
        [StringLength(50)]
        public string SchoolName { get; set; }
        

        // Foreign Keys
        [ForeignKey("Province")]
        public int ProvinceId { get; set; }
        public Province Province { get; set; }
    }
}
