namespace Weather.Station.Model
{
    public class WeatherStationValues
    {
        public static WeatherStationValues Random() 
        {
            var rand = new Random();
            return new WeatherStationValues()
            {
                Temperature = rand.NextDouble() * 40,
                AbsolutePressure = rand.NextDouble() * 50,
                SeaLevelPressure = rand.NextDouble() * 50,
                Altitude = rand.NextDouble() * 20,
                Humidity = rand.NextDouble(),
                Anemometer = rand.NextDouble() * 20,
                WaterSensor = rand.NextDouble() * 50,
                Instant = DateTime.Now,
            };
        }

        public int Id { get; set; }
        public double Temperature { get; set; }
        public double AbsolutePressure { get; set; }
        public double SeaLevelPressure { get; set; }
        public double Altitude { get; set; }
        public double Humidity { get; set; }
        public double Anemometer { get; set; }
        public double WaterSensor { get; set; }
        public DateTime Instant { get; set; }
    }
}
