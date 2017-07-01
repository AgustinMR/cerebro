using cerebro_SignalrServer;
using MongoDB.Driver;
using PusherServer;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;

namespace cerebro_ServiceLayer.Controllers
{
    [RoutePrefix("api/chats")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ChatController : ApiController
    {
        [HttpPost]
        [Route("")]
        public IHttpActionResult Trigger([FromUri]ChatMensaje m)
        {
            //var options = new PusherOptions();
            //options.Cluster = "us2";
            //var pusher = new Pusher("342446", "5b358aae693e596e8b06", "3cf17facdee3ed513b0a", options);
            var options = new PusherOptions { Cluster = "us2", Encrypted = true };
            var pusher = new Pusher( "358420", "016fdcbcf95a1344ca6a", "24679e608fb35b815512", options);
            var result = pusher.TriggerAsync(m.agrupacion, "mensaje-nuevo", m);
            new MongoClient().GetDatabase("cerebroDB").GetCollection<ChatMensaje>("Chats").InsertOne(m);
            return Ok("Ok");
        }

        [HttpPost]
        [Route("nuevo")]
        public void agregarMensaje(ChatMensaje m) {
            new MongoClient().GetDatabase("cerebroDB").GetCollection<ChatMensaje>("Chats").InsertOne(m);
        }

        [HttpGet]
        [Route("")]
        public async Task<List<ChatMensaje>> getMensajes(string agrupacion)
        {
            var filter = Builders<ChatMensaje>.Filter.Eq("agrupacion", agrupacion);
            var sort = Builders<ChatMensaje>.Sort.Ascending("datetime");
            return await new MongoClient().GetDatabase("cerebroDB").GetCollection<ChatMensaje>("Chats").Find(filter).Sort(sort).Limit(20).ToListAsync();
        }
    }
}
