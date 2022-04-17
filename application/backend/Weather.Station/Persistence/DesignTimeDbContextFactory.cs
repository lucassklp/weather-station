using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging.Abstractions;
using EnvironmentName = Microsoft.AspNetCore.Hosting.EnvironmentName;

namespace Weather.Station.Persistence
{
    public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<DaoContext>
    {
        public DaoContext CreateDbContext(string[] args)
        {
            var config = Directory.GetParent(Directory.GetCurrentDirectory())
                            .GetDirectories()
                            .Where(x => x.Name == "Weather.Station")?.First()?.FullName;

            var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? EnvironmentName.Development;

            IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath(config)
                .AddJsonFile("appsettings.json")
                .AddJsonFile($"appsettings.{env}.json")
                .Build();

            var builder = new DbContextOptions<DaoContext>();
            return new DaoContext(builder, NullLoggerFactory.Instance, configuration);

        }
    }
}
