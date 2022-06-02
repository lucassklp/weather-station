using Microsoft.AspNetCore.Mvc;
using Weather.Station.Model;
using Weather.Station.Services;

namespace Weather.Station.Controllers
{
    [ApiController]
    [Route("/api/weather-station")]
    public class WeatherStationController : ControllerBase
    {
        private readonly SensorServices sensorServices;

        public WeatherStationController(SensorServices sensorServices)
        {
            this.sensorServices = sensorServices;
        }

        [HttpGet]
        public List<WeatherStationValues> Get()
        {
            return sensorServices.GetLastWeatherStationValues(10);
        }

        [HttpPost]
        public async Task Add(WeatherStationValues values)
        {
            await sensorServices.PublishAndStoreValues(values);
        }
    }
}