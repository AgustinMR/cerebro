using cerebro;
using cerebro_BusinessLogicLayer;
using MongoDB.Bson;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Cors;

namespace cerebro_ServiceLayer.Controllers
{
    [RoutePrefix("api/tipos")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class TipoDeFuenteDeDatoController : ApiController
    {
        [HttpPost]
        [Route("")]
        public bool addTipoDeFuenteDeDato([FromUri]TipoDeFuenteDeDato t)
        {
            return new BLTipoDeFuenteDeDato().addTipoDeFuenteDeDato(t);
        }

        [HttpDelete]
        [Route("{id}")]
        public bool deleteTipoDeFuenteDeDato(string id)
        {
            return new BLTipoDeFuenteDeDato().deleteTipoDeFuenteDeDato(ObjectId.Parse(id));
        }

        [HttpGet]
        [Route("")]
        public List<TipoDeFuenteDeDato> getAllTipoDeFuenteDeDatos()
        {
            return new BLTipoDeFuenteDeDato().getAllTipoDeFuenteDeDatos();
        }

        [HttpGet]
        [Route("{id}")]
        public TipoDeFuenteDeDato getTipoDeFuenteDeDato(string id)
        {
            return new BLTipoDeFuenteDeDato().getTipoDeFuenteDeDato(ObjectId.Parse(id));
        }

        [HttpPut]
        [Route("")]
        public bool updateTipoDeFuenteDeDato([FromUri]TipoDeFuenteDeDato t)
        {
            return new BLTipoDeFuenteDeDato().updateTipoDeFuenteDeDato(t);
        }

        [HttpGet]
        [Route("muni/{id}")]
        public List<TipoDeFuenteDeDato> getAllTipoDeFuenteDeDatos(string id)
        {
            return new BLTipoDeFuenteDeDato().getAllTipoDeFuenteDeDatos(id);
        }
    }
}
