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
        public string addEvento([FromUri]Evento e)
        {

            BLEvento IBLEve = new BLEvento();
            return IBLEve.addEvento(e);
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
        public bool updateEvento(string id, string nombre, string accion)
        {
            Evento e = new Evento(ObjectId.Parse(id), nombre, accion);
            return new BLEvento().updateEvento(e);
        }

        [HttpPost]
        [Route("dll")]
        public string dispararAccionEvento(string idEve)
        {
            new BLEvento().dispararAccionEvento(idEve);
            return ("ok");
        }

        [HttpGet]
        [Route("acciones/{id}")]
        public List<Accion> getAcciones(string id)
        {
            return new BLEvento().getAcciones(id);
        }

        [HttpGet]
        [Route("muni/{id}")]
        public List<Evento> getEventosMuni(string id)
        {
            return new BLEvento().getEventosMuni(id);
        }

        [HttpGet]
        [Route("umbrales/{id}")]
        public List<Umbral> getUmbralesEve(string id)
        {
            return new BLEvento().getUmbralesEve(id);
        }

        [HttpPut]
        [Route("umbrales")]
        public bool updateUmbral(string id, string idEve, string idDis, string valor)
        {
            Umbral u = new Umbral(id, idEve, idDis, valor);
            return new BLEvento().updateUmbral(u);
        }

        [HttpDelete]
        [Route("umbrales/{id}")]
        public bool deleteUmbral(string id)
        {
            return new BLEvento().deleteUmbral(ObjectId.Parse(id));
        }
    }
}
