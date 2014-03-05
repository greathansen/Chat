using System;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace SpaceWar.Hubs
{
    [HubName("ChatHub")]
    public class ChatHub : Hub
    {
        [HubMethodName("Send")]
        public void Send(ChatDtoForSend message)
        {
            Clients.AllExcept(Context.ConnectionId).Response(message);
            Clients.AllExcept(Context.ConnectionId).Alert();
        }

        public override System.Threading.Tasks.Task OnDisconnected()
        {
            Clients.Caller.Disconnect();
            return base.OnDisconnected();
        }
    }

    public class ChatDtoForSend
    {
        public string Sender { get; set; }
        public string Message { get; set; }
        public string TimeStamp { get; set; }
    }
}