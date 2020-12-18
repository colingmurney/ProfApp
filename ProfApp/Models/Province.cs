using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProfApp.Models
{
    [Table("Province")]
    public class Province
    {
        [Key]
        public int ProvinceId { get; set; }
        [Required]
        [StringLength(25)]
        public string ProvinceName { get; set; }

    }
}
