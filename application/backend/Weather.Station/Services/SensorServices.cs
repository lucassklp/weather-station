using Microsoft.AspNetCore.SignalR;
using System.Reactive.Linq;
using Weather.Station.Hubs;
using Weather.Station.Model;
using Weather.Station.Persistence;

namespace Weather.Station.Services
{

    public class SensorServices
    {
        private readonly IObservable<WeatherStationValues> sensorObservable;
        private readonly DaoContext daoContext;
        private readonly IHubContext<SensorHub> hubContext;

        public SensorServices(DaoContext daoContext, IHubContext<SensorHub> hubContext)
        {
            this.daoContext = daoContext;
            this.hubContext = hubContext;
        }

        public IObservable<WeatherStationValues> GetRealTimeWeatherStationValues()
        {
            return this.sensorObservable;
        }

        public async Task PublishAndStoreValues(WeatherStationValues sensorValues)
        {
            await hubContext.Clients.Group("chart")
                .SendAsync("sensor-values", sensorValues);
            await daoContext.AddAsync(sensorValues);
            await daoContext.SaveChangesAsync();
        }

        public List<WeatherStationValues> GetLastWeatherStationValues(int count)
        {
            return daoContext.WeatherStation.OrderByDescending(x => x.Instant)
                .Take(count)
                .ToList();
        }
    }
}
