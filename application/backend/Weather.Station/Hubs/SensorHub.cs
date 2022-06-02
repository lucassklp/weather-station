using Microsoft.AspNetCore.SignalR;

namespace Weather.Station.Hubs
{
    public class SensorHub : Hub
    {
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
