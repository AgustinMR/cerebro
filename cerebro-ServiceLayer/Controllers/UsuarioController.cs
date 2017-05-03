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
    [RoutePrefix("api/usuarios")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class UsuarioController : ApiController
    {

        [HttpPost]
        [Route("vistante")]
        public IHttpActionResult addAgrupacion([FromUri]Visitante vis)
        {
            if (vis != null)
            {
                IBLUsuario IBLAgru = new BLUsuario();
                IBLAgru.addVisitante(vis);
                return Ok();
            }
            return BadRequest();
        }

        [HttpPost]
        [Route("operador")]
        public IHttpActionResult addOperador([FromUri]Operador op)
        {
            if (op != null)
            {
                IBLUsuario IBLAgru = new BLUsuario();
                IBLAgru.addOperador(op);
                return Ok();
            }
            return BadRequest();
        }

        [HttpPost]
        [Route("administrador")]
        public IHttpActionResult addAdministrador([FromUri]Administrador admin)
        {
            if (admin != null)
            {
                IBLUsuario IBLAgru = new BLUsuario();
                IBLAgru.addAdministrador(admin);
                return Ok();
            }
            return BadRequest();
        }

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


        [HttpDelete]
        [Route("vistante")]
        public IHttpActionResult deleteVisitante([FromUri]Visitante vis)
        {
            if (vis != null)
            {
                IBLUsuario IBLAgru = new BLUsuario();
                IBLAgru.deleteVisitante(vis);
                return Ok();
            }
            return BadRequest();
        }

        [HttpDelete]
        [Route("operador")]
        public IHttpActionResult deleteOperador([FromUri]Operador op)
        {
            if (op != null)
            {
                IBLUsuario IBLAgru = new BLUsuario();
                IBLAgru.deleteOperador(op);
                return Ok();
            }
            return BadRequest();
        }

        [HttpDelete]
        [Route("administrador")]
        public IHttpActionResult deleteAdministrador([FromUri]Administrador admin)
        {
            if (admin != null)
            {
                IBLUsuario IBLAgru = new BLUsuario();
                IBLAgru.deleteAdministrador(admin);
                return Ok();
            }
            return BadRequest();
        }

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


        [HttpPut]
        [Route("vistante")]
        public IHttpActionResult updateVisitante([FromUri]Visitante vis)
        {
            if (vis != null)
            {
                IBLUsuario IBLAgru = new BLUsuario();
                IBLAgru.updateVisitante(vis);
                return Ok();
            }
            return BadRequest();
        }

        [HttpPut]
        [Route("operador")]
        public IHttpActionResult updateOperador([FromUri]Operador op)
        {
            if (op != null)
            {
                IBLUsuario IBLAgru = new BLUsuario();
                IBLAgru.updateOperador(op);
                return Ok();
            }
            return BadRequest();
        }

        [HttpPut]
        [Route("administrador")]
        public IHttpActionResult updateAdministrador([FromUri]Administrador admin)
        {
            if (admin != null)
            {
                IBLUsuario IBLAgru = new BLUsuario();
                IBLAgru.updateAdministrador(admin);
                return Ok();
            }
            return BadRequest();
        }
    }
}
