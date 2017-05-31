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
                return Ok("ok");
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
                return Ok("ok");
            }
            return BadRequest();
        }

        [HttpGet]
        [Route("byUsuario")]
        public List<string> getAgrupacionesByUsuario([FromUri]Agrupacion_Usuario a)
        {
            return new BLAgrupacion().obtenerAgrupacionesByUsuario(a.usuario_email);
        }

        [HttpGet]
        [Route("")]
        public Agrupacion getAgrupacion([FromUri]Agrupacion a)
        {
            return new BLAgrupacion().obtenerAgrupacion(a.nombre, a.nombre_municipalidad);
        }

        [HttpGet]
        [Route("{nombre}")]
        public List<Agrupacion_Usuario> getUsuariosAgrupacion(string nombre)
        {
            return new BLAgrupacion().obtenerUsuariosAgrupacion(nombre);
        }

        [HttpPost]
        [Route("usuario")]
        public IHttpActionResult addUsuarioAgrupacion([FromUri]Agrupacion_Usuario AUsu)
        {
            if (AUsu != null)
            {
                IBLAgrupacion IBLAgru = new BLAgrupacion();
                IBLAgru.addUsuariosAgrupacion(AUsu);
                return Ok("ok");
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
                return Ok("ok");
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
                return Ok("ok");
            }
            return BadRequest();
        }

    }
}
