namespace Weather.Station.Model
{
    public class WeatherStationValues
    {
        public int Id { get; set; }
        public double Temperature { get; set; }
        public double Pressure { get; set; }
        public double UV { get; set; }
        public double Humidity { get; set; }
        public double Anemometer { get; set; }
        public double WaterSensor { get; set; }
        public DateTime Instant { get; set; }
        public double RSSI { get; set; }
    }
}
