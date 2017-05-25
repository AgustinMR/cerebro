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
        [Route("")]
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

        [HttpDelete]
        [Route("")]
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

        [HttpGet]
        [Route("")]
        public Agrupacion getAgrupacion([FromUri]Agrupacion a)
        {
            return new BLAgrupacion().obtenerAgrupacion(a.nombre, a.nombre_municipalidad);
        }

        [HttpGet]
        [Route("usuario")]
        public List<Agrupacion_Usuario> getUsuariosAgrupacion([FromUri]Agrupacion a) {
            return new BLAgrupacion().obtenerUsuariosAgrupacion(a.nombre, a.nombre_municipalidad);
        }

        [HttpPost]
        [Route("usuario")]
        public IHttpActionResult addUsuarioAgrupacion([FromUri]Agrupacion_Usuario AUsu)
        {
            if (AUsu != null)
            {
                IBLAgrupacion IBLAgru = new BLAgrupacion();
                IBLAgru.addUsuariosAgrupacion(AUsu);
                return Ok();
            }
            return BadRequest();
        }

        [HttpPut]
        [Route("usuario")]
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
        [Route("usuario")]
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



    }
}
