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
    [RoutePrefix("api/dispositivos")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class FuenteDeDatoController : ApiController
    {
        [HttpPost]
        [Route("")]
        public bool addFuenteDeDato([FromUri]FuenteDeDato f)
        {
            return new BLFuenteDeDato().addFuenteDeDato(f);
        }

        [HttpDelete]
        [Route("{id:ObjectId}")]
        public bool deleteFuenteDeDato(ObjectId id)
        {
            return new BLFuenteDeDato().deleteFuenteDeDato(id);
        }

        [HttpGet]
        [Route("")]
        public List<FuenteDeDato> getAllFuenteDeDato()
        {
            return new BLFuenteDeDato().getAllFuenteDeDato();
        }

        [HttpGet]
        [Route("{id:ObjectId}")]
        public FuenteDeDato getFuenteDeDato(ObjectId id)
        {
            return new BLFuenteDeDato().getFuenteDeDato(id);
        }

        [HttpPut]
        [Route("")]
        public bool updateFuenteDeDato([FromUri]FuenteDeDato f)
        {
            return new BLFuenteDeDato().updateFuenteDeDato(f);
        }
    }
}
