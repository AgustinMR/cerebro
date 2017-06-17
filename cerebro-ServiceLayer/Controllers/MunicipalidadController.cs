using cerebro;
using cerebro_BusinessLogicLayer;
using MongoDB.Bson;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Cors;

namespace cerebro_ServiceLayer.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [RoutePrefix("api/municipalidades")]
    public class MunicipalidadController : ApiController
    {
        [System.Web.Http.HttpPost]
        [Route("")]
        public IHttpActionResult addAgrupacion([FromUri]Municipalidad muni)
        {
            if (muni != null)
            {
                IBLMunicipalidad IBLMuni = new BLMunicipalidad();
                IBLMuni.addMunicipalidad(muni);
                return Ok();
            }
            return BadRequest();
        }

        [System.Web.Http.HttpDelete]
        [Route("")]
        public IHttpActionResult deleteMunicipalidad([FromUri]Municipalidad muni)
        {
            if (muni != null)
            {
                IBLMunicipalidad IBLMuni = new BLMunicipalidad();
                IBLMuni.deleteMunicipalidad(muni);
                return Ok();
            }
            return BadRequest();
        }

        [System.Web.Http.HttpGet]
        [Route("")]
        public List<Municipalidad> getMunicipalidades()
        {
            IBLMunicipalidad IBLMuni = new BLMunicipalidad();
            return IBLMuni.getMunicipalidades();
        }

        [System.Web.Http.HttpGet]
        [Route("{municipalidad}")]
        public Municipalidad getMunicipalidad(string municipalidad)
        {
            return new BLMunicipalidad().getMunicipalidad(municipalidad);
        }

        [System.Web.Http.HttpGet]
        [Route("{municipalidad}/dispositivos")]
        public List<FuenteDeDato> getDispositivosByMunicipalidad(string municipalidad)
        {
            return new BLFuenteDeDato().getAllFuenteDeDatoMuni(municipalidad);
        }
    }
}