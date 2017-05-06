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
        [Route("{id}")]
        public bool deleteFuenteDeDato(string id)
        {
            return new BLFuenteDeDato().deleteFuenteDeDato(ObjectId.Parse(id));
        }

        [HttpGet]
        [Route("")]
        public List<FuenteDeDato> getAllFuenteDeDato()
        {
            return new BLFuenteDeDato().getAllFuenteDeDato();
        }

        [HttpGet]
        [Route("{id}")]
        public FuenteDeDato getFuenteDeDato(string id)
        {
            return new BLFuenteDeDato().getFuenteDeDato(ObjectId.Parse(id));
        }

        [HttpPut]
        [Route("")]
        public bool updateFuenteDeDato([FromUri]FuenteDeDato f)
        {
            return new BLFuenteDeDato().updateFuenteDeDato(f);
        }
    }
}
