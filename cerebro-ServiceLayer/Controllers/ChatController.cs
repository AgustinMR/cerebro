using cerebro;
using cerebro_BusinessLogicLayer;
using cerebro_ServiceLayer.Models;
using PusherServer;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Cors;


namespace cerebro_ServiceLayer.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [RoutePrefix("api/chats")]
    public class ChatController : ApiController
    {
        [System.Web.Http.HttpPost]
        [Route("")]
        public IHttpActionResult Trigger([FromUri]ChatMensaje m)
        {
            var options = new PusherOptions();
            options.Cluster = "us2";
            var pusher = new Pusher("342446", "5b358aae693e596e8b06", "3cf17facdee3ed513b0a", options);
            var result = pusher.TriggerAsync(m.agrupacion, "mensaje-nuevo", m);
            return Ok("Ok");
        }
    }
}