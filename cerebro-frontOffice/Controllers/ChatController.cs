using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PusherServer;
using cerebro_SignalrServer;
using System.Net;
using Newtonsoft.Json;

namespace cerebro_frontOffice.Controllers
{
    [Produces("application/json")]
    public class ChatController : Controller
    {
        [HttpPost]
        [Route("api/chats")]
        public async Task<ActionResult> HelloWorld()
        {
            var pusher = new Pusher("342446", "5b358aae693e596e8b06", "3cf17facdee3ed513b0a");
            var result = await pusher.TriggerAsync("test_channel", "my_event", new { message = "hello world" });
            return new OkResult();
        }
    }
}