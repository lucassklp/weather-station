using Microsoft.AspNetCore.SignalR;
using Weather.Station.Model;
using Weather.Station.Services;

namespace Weather.Station.Hubs
{
    public class SensorHub : Hub
    {

        private SensorServices sensorServices;
        public SensorHub(SensorServices sensorServices)
        {
            this.sensorServices = sensorServices;
        }

        public override async Task OnConnectedAsync()
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, "chart");
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, "chart");
            await base.OnDisconnectedAsync(exception);
        }

    }
}
