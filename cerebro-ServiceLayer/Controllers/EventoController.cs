using cerebro;
using cerebro_BusinessLogicLayer;
using MongoDB.Bson;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Cors;

namespace cerebro_ServiceLayer.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [RoutePrefix("api/eventos")]
    public class EventoController : ApiController
    {
        [System.Web.Http.HttpPost]
        [Route("addEvento")]
        public string addEvento([FromUri]Evento e)
        {

            BLEvento IBLEve = new BLEvento();
            return IBLEve.addEvento(e);
        }

        [System.Web.Http.HttpPost]
        [Route("addUmbral")]
        public bool addUmbral([FromUri]Umbral u)
        {
            return new BLEvento().addUmbral(u);
        }

        [System.Web.Http.HttpDelete]
        [Route("{id}")]
        public bool deleteEvento(string id)
        {
            return new BLEvento().deleteEvento(ObjectId.Parse(id));
        }

        [System.Web.Http.HttpGet]
        [Route("")]
        public List<Evento> getAllEventos()
        {
            return new BLEvento().getAllEventos();
        }

        [System.Web.Http.HttpPost]
        [Route("{id}")]
        public Evento getEvento(string id)
        {
            return new BLEvento().getEvento(ObjectId.Parse(id));
        }

        [System.Web.Http.HttpPut]
        [Route("")]
        public bool updateEvento(string id, string nombre, string accion)
        {
            Evento e = new Evento(ObjectId.Parse(id), nombre, accion);
            return new BLEvento().updateEvento(e);
        }

        [System.Web.Http.HttpPost]
        [Route("dll")]
        public void dispararAccionEvento(string idEve)
        {
            new BLEvento().dispararAccionEvento(idEve);
        }

        [System.Web.Http.HttpGet]
        [Route("acciones/{id}")]
        public List<Accion> getAcciones(string id)
        {
            return new BLEvento().getAcciones(id);
        }

        [System.Web.Http.HttpGet]
        [Route("muni/{id}")]
        public List<Evento> getEventosMuni(string id)
        {
            return new BLEvento().getEventosMuni(id);
        }

        [System.Web.Http.HttpGet]
        [Route("umbrales/{id}")]
        public List<Umbral> getUmbralesEve(string id)
        {
            return new BLEvento().getUmbralesEve(id);
        }

        [System.Web.Http.HttpPut]
        [Route("umbrales")]
        public bool updateUmbral(string id, string idEve, string idDis, string valor)
        {
            Umbral u = new Umbral(id, idEve, idDis, valor);
            return new BLEvento().updateUmbral(u);
        }

        [System.Web.Http.HttpDelete]
        [Route("umbrales/{id}")]
        public bool deleteUmbral(string id)
        {
            return new BLEvento().deleteUmbral(ObjectId.Parse(id));
        }
    }
}