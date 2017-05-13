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
        [Route("addEvento")]
        public bool addEvento([FromUri]Evento e)
        {
            return new BLEvento().addEvento(e);
        }

        [HttpPost]
        [Route("addUmbral")]
        public bool addUmbral([FromUri]Umbral u)
        {
            return new BLEvento().addUmbral(u);
        }

        [HttpDelete]
        [Route("{id}")]
        public bool deleteEvento(string id)
        {
            return new BLEvento().deleteEvento(ObjectId.Parse(id));
        }

        [HttpGet]
        [Route("")]
        public List<Evento> getAllEventos()
        {
            return new BLEvento().getAllEventos();
        }

        [HttpPost]
        [Route("{id}")]
        public Evento getEvento(string id)
        {
            return new BLEvento().getEvento(ObjectId.Parse(id));
        }

        [HttpPut]
        [Route("")]
        public bool updateEvento(Evento e)
        {
            return new BLEvento().updateEvento(e);
        }
    }
}
