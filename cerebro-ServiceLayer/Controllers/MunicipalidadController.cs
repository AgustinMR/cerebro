using cerebro;
using cerebro_BusinessLogicLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace cerebro_ServiceLayer.Controllers
{
    [RoutePrefix("api/municipalidades")]
    [EnableCors(origins: "www.cerebro-frontOffice.com,www.*.cerebro-frontOffice.com,www.cerebro-backOffice.com,www.*.cerebro-backOffice.com", headers: "*", methods: "*")]
    public class MunicipalidadController : ApiController
    {

        [HttpPost]
        [Route("")]
        public IHttpActionResult addMunicipalidad(string nombre, string ubicacion)
        {
            Municipalidad muni = new Municipalidad();
            muni.nombre = nombre;
            muni.ubicacion = ubicacion;
            if (muni != null)
            {
                IBLMunicipalidad IBLMuni = new BLMunicipalidad();
                IBLMuni.addMunicipalidad(muni);
                return Ok("OK");
            }
            return BadRequest("Error");
        }

        [HttpDelete]
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

        [HttpGet]
        [Route("")]
        public List<Municipalidad> getMunicipalidades()
        {
            IBLMunicipalidad IBLMuni = new BLMunicipalidad();
            return IBLMuni.getMunicipalidades();
        }

        [HttpGet]
        [Route("{municipalidad}")]
        public Municipalidad getMunicipalidad(string municipalidad)
        {
            return new BLMunicipalidad().getMunicipalidad(municipalidad);
        }

        [HttpGet]
        [Route("{municipalidad}/dispositivos")]
        public List<FuenteDeDato> getDispositivosByMunicipalidad(string municipalidad)
        {
            return new BLFuenteDeDato().getAllFuenteDeDatoMuni(municipalidad);
        }
    }
}
