using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using cerebro;
using cerebro_BusinessLogicLayer;

namespace cerebro_ServiceLayer.Controllers
{
    [RoutePrefix("api/agrupaciones")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class AgrupacionController : ApiController
    {
        [HttpPost]
        [Route("nueva")]
        public IHttpActionResult addAgrupacion([FromUri]Agrupacion_Usuario AUsu)
        {
            if (AUsu != null)
            {
                IBLAgrupacion IBLAgru = new BLAgrupacion();
                IBLAgru.addAgrupacion(AUsu);
                return Ok();
            }
            return BadRequest();
        }

        [HttpPost]
        [Route("nuevoUsuario")]
        public IHttpActionResult addUsuarioAgrupacion([FromUri]Agrupacion_Usuario AUsu)
        {
            if (AUsu != null)
            {
                IBLAgrupacion IBLAgru = new BLAgrupacion();
                IBLAgru.addUsuariosAgrupacion(AUsu;
                return Ok();
            }
            return BadRequest();
        }

        [HttpPut]
        [Route("")]
        public IHttpActionResult updateAdminAgrupacion([FromUri]Agrupacion_Usuario AUsu)
        {
            if (AUsu != null)
            {
                IBLAgrupacion IBLAgru = new BLAgrupacion();
                IBLAgru.updateAdminAgrupacion(AUsu);
                return Ok();
            }
            return BadRequest();
        }

        [HttpDelete]
        [Route("deleteUsuario")]
        public IHttpActionResult deleteUsuarioAgrupacion([FromUri]Agrupacion_Usuario AUsu)
        {
            if (AUsu != null)
            {
                IBLAgrupacion IBLAgru = new BLAgrupacion();
                IBLAgru.deleteUsuarioAgrupacion(AUsu);
                return Ok();
            }
            return BadRequest();
        }

        [HttpDelete]
        [Route("deleteAgrupacion")]
        public IHttpActionResult deleteAgrupacion([FromUri]Agrupacion grupo)
        {
            if (grupo != null)
            {
                IBLAgrupacion IBLAgru = new BLAgrupacion();
                IBLAgru.deleteAgrupacion(grupo);
                return Ok();
            }
            return BadRequest();
        }
    }
}
