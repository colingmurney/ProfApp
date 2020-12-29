using Microsoft.EntityFrameworkCore;

namespace ProfApp.Models
{
    public class ProfAppContext : DbContext
    {
        public ProfAppContext(DbContextOptions<ProfAppContext> options)
            : base(options)
        {}

        public DbSet<Province> Provinces { get; set; }
        public DbSet<School> Schools { get; set; }
        public DbSet<Prof> Profs { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Downvote> Downvotes { get; set; }
        public DbSet<Upvote> Upvotes { get; set; }
        public DbSet<PostResponse> PostResponses { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Data Source=COLIN;Initial Catalog=ProfAppV2;Integrated Security=True;ConnectRetryCount=0");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // create composite key with PostId, UserId, and Date 
            modelBuilder.Entity<Comment>()
                .HasKey(c => new { c.PostId, c.StudentId, c.Date });

            // create composite key with PostId and UserId 
            modelBuilder.Entity<Upvote>()
                .HasKey(u => new { u.PostId, u.StudentId });

            // create composite key with PostId and UserId 
            modelBuilder.Entity<Downvote>()
                .HasKey(d => new { d.PostId, d.StudentId });

            // make Email column unique
            modelBuilder.Entity<Student>()
                .HasIndex(s =>  s.Email )
                    .IsUnique();

            // make ProvinceName column unique
            modelBuilder.Entity<Province>()
                .HasIndex(p => p.ProvinceName)
                    .IsUnique();

            // make Prof unique index
            modelBuilder.Entity<Prof>()
                .HasIndex(p => new { p.ProfFirstName, p.ProfLastName, p.SchoolId  })
                    .IsUnique();

            modelBuilder.Entity<PostResponse>()
                .HasNoKey();

        }
    }
}
