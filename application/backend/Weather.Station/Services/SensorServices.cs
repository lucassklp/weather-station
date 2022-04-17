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


        public SensorServices(DaoContext daoContext, ILogger<SensorServices> logger, IHubContext<SensorHub> hubContext)
        {
            this.daoContext = daoContext;

            // This part probably will be changed in the future to support ZigBee communication.
            // For now, we use mocked values
            logger.LogInformation("Setting up timer");
            this.sensorObservable = Observable.Timer(TimeSpan.FromSeconds(1))
                .Repeat()
                .Select(_ => WeatherStationValues.Random());




            // Asynchronously store the sensor values to database (I know Rx is beautiful <3)
            sensorObservable.Subscribe(async sensorValues =>
            {
                await hubContext.Clients.Group("chart")
                    .SendAsync("sensor-values", sensorValues);
                logger.LogInformation($"Saving new entity: {sensorValues}");
                daoContext.WeatherStation.Add(sensorValues);
                await daoContext.SaveChangesAsync();
            });
        }

        public IObservable<WeatherStationValues> GetRealTimeWeatherStationValues()
        {
            return this.sensorObservable;
        }

        public List<WeatherStationValues> GetLastWeatherStationValues(int count)
        {
            return daoContext.WeatherStation.OrderByDescending(x => x.Instant)
                .Take(count)
                .ToList();
        }
    }
}
