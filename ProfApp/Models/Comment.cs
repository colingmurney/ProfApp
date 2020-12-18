using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProfApp.Models
{
    
    [Table("Comment")]
    public class Comment
    {
        [Required]
        [StringLength(1000)]
        public string Body { get; set; }
        [Required]
        public DateTime Date { get; set; }

        // Foreign Keys
        [ForeignKey("Post")]
        public int PostId { get; set; }
        public Post Post { get; set; }
        [ForeignKey("Student")]
        public int StudentId { get; set; }
        public Student Student { get; set; }

    }
}
