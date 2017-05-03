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
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class MunicipalidadController : ApiController
    {

        [HttpPost]
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
    }
}
