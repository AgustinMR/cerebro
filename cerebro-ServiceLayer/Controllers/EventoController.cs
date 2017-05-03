using cerebro;
using cerebro_BusinessLogicLayer;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace cerebro_ServiceLayer.Controllers
{
    [RoutePrefix("api/eventos")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class EventoController : ApiController
    {
        [HttpPost]
        [Route("")]
        public bool addEvento([FromUri]Evento e)
        {
            return new BLEvento().addEvento(e);
        }

        [HttpDelete]
        [Route("{id:ObjectId}")]
        public bool deleteEvento(ObjectId id)
        {
            return new BLEvento().deleteEvento(id);
        }

        [HttpGet]
        [Route("")]
        public List<Evento> getAllEventos()
        {
            return new BLEvento().getAllEventos();
        }

        [HttpPost]
        [Route("{id:ObjectId}")]
        public Evento getEvento(ObjectId id)
        {
            return new BLEvento().getEvento(id);
        }

        [HttpPut]
        [Route("")]
        public bool updateEvento(Evento e)
        {
            return new BLEvento().updateEvento(e);
        }
    }
}
