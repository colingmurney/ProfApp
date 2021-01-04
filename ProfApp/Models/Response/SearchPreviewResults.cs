using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProfApp.Models
{
    public class SearchPreviewResults
    {
        public int PostId { get; set; }
        public string Course { get; set; }
        public string Header { get; set; }
        public string Body { get; set; }
        public string ProfFullName { get; set; }
    }
}
