using Microsoft.EntityFrameworkCore;
using System.Reflection;
using Weather.Station.Model;

namespace Weather.Station.Persistence
{
    public class DaoContext : DbContext
    {
        private readonly ILoggerFactory loggerFactory;
        private readonly IConfiguration configuration;

        public DbSet<WeatherStationValues> WeatherStation { get; set; }

        public DaoContext(DbContextOptions<DaoContext> options, ILoggerFactory loggerFactory, IConfiguration configuration)
            : base(options)
        {
            this.configuration = configuration;
            this.loggerFactory = loggerFactory;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var serverVersion = new MySqlServerVersion(new Version(8, 0, 27));
            optionsBuilder.UseMySql(configuration.GetConnectionString("DefaultConnection"), serverVersion);
            optionsBuilder.UseLoggerFactory(loggerFactory);
            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
            base.OnModelCreating(modelBuilder);
        }
    }
}
