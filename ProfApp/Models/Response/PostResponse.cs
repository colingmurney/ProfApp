using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ProfApp.Models
{

    public class PostResponse
    {
        public int PostId { get; set; }
        public DateTime Date { get; set; }
        public string Course { get; set; }
        public string Header { get; set; }
        public string Body { get; set; }
        public string Attachment { get; set; }
        [NotMapped]
        public string ImageSrc { get; set; }
        public int ProfId { get; set; }
        public int StudentId { get; set; }

        public int? Vote { get; set; }
    }
}
