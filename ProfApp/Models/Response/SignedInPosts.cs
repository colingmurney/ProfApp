using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ProfApp.Models
{

    public class SignedInPosts
    {
        //This class should inherit NotSignedInPosts and only have attribute CurrentVoteStatus,
        //but I was getting weird errors

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
        public int? CurrentVoteStatus { get; set; }
        public int TotalVotes { get; set; }
    }
}
