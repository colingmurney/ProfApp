using Microsoft.AspNetCore.Http;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProfApp.Models
{
    [Table("Post")]
    public class Post
    {
        [Key]
        public int PostId { get; set; }
        [Required]
        public DateTime Date { get; set; }
        [Required]
        [StringLength(50)]
        public string Course { get; set; }
        [Required]
        [StringLength(50)]
        public string Header { get; set; }
        [Required]
        [StringLength(100)]
        public string Body { get; set; }
        
        [StringLength(255)]
        public string Attachment { get; set; }
        [NotMapped]
        public IFormFile ImageFile { get; set; }
        [NotMapped]
        public string ImageSrc { get; set; }


        // Foreign Keys
        [ForeignKey("Prof")]
        public int ProfId { get; set; }
        public Prof Prof { get; set; }
        [ForeignKey("Student")]
        public int StudentId { get; set; }
        public Student Student { get; set; }
    }
}
