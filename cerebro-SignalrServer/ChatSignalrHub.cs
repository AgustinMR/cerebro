using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace cerebro_SignalrServer
{
    public class ChatSignalrHub : Hub
    {
        public async Task Subscribe(string c)
        {
            await Groups.Add(Context.ConnectionId, c);
            Console.WriteLine("====> Nueva Suscripcion | Id: " + Context.ConnectionId + " --- Channel: " + c);
            var ev = new EventMessage
            {
                channel = c,
                name = "user.subscribed",
                data = new
                {
                    Context.ConnectionId,
                    ChannelName = c
                }
            };

            await Publish(ev);
        }

        public async Task Unsubscribe(string c)
        {
            await Groups.Remove(Context.ConnectionId, c);

            var ev = new EventMessage
            {
                channel = c,
                name = "user.unsubscribed",
                data = new
                {
                    Context.ConnectionId,
                    ChannelName = c
                }
            };

            await Publish(ev);
        }


        public Task Publish(EventMessage channelEvent)
        {
            Clients.Group(channelEvent.channel).OnEvent(channelEvent.channel, channelEvent);
            return Task.FromResult(0);
        }

        public override Task OnConnected()
        {
            var ev = new EventMessage
            {
                channel = "MENSAJE_NUEVO",
                name = "user.connected",
                data = new
                {
                    Context.ConnectionId,
                }
            };

            Publish(ev);

            return base.OnConnected();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            var ev = new EventMessage
            {
                channel = "MENSAJE_NUEVO",
                name = "user.disconnected",
                data = new
                {
                    Context.ConnectionId,
                }
            };

            Publish(ev);

            return base.OnDisconnected(stopCalled);
        }
    }
}