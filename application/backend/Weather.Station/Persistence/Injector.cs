using Microsoft.EntityFrameworkCore;

namespace Weather.Station.Persistence
{
    public static class Injector
    {
        public static IServiceCollection AddPersistence(this IServiceCollection services)
        {
            services.AddDbContext<DaoContext>(ServiceLifetime.Singleton);
            
            //Migrate Database
            var daoContext = services.BuildServiceProvider().GetService<DaoContext>();
            daoContext!.Database.Migrate();

            return services;
        }
    }
}
