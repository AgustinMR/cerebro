using cerebro;
using cerebro_BusinessLogicLayer;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Cors;

namespace cerebro_ServiceLayer.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [RoutePrefix("api/agrupaciones")]
    public class AgrupacionController : ApiController
    {
        [System.Web.Http.HttpPost]
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

        [System.Web.Http.HttpDelete]
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

        [System.Web.Http.HttpGet]
        [Route("byUsuario")]
        public List<string> getAgrupacionesByUsuario([FromUri]Agrupacion_Usuario a)
        {
            return new BLAgrupacion().obtenerAgrupacionesByUsuario(a.usuario_email);
        }

        [System.Web.Http.HttpGet]
        [Route("")]
        public Agrupacion getAgrupacion([FromUri]Agrupacion a)
        {
            return new BLAgrupacion().obtenerAgrupacion(a.nombre, a.nombre_municipalidad);
        }

        [System.Web.Http.HttpGet]
        [Route("{nombre}")]
        public List<Agrupacion_Usuario> getUsuariosAgrupacion(string nombre)
        {
            return new BLAgrupacion().obtenerUsuariosAgrupacion(nombre);
        }

        [System.Web.Http.HttpPost]
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

        [System.Web.Http.HttpPut]
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

        [System.Web.Http.HttpDelete]
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