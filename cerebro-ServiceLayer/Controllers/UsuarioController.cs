﻿using System.Web.Http;
using System.Web.Http.Cors;
using cerebro_BusinessLogicLayer;
using cerebro;

namespace cerebro_ServiceLayer.Controllers
{
    [RoutePrefix("api/usuarios")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class UsuarioController : ApiController
    {

        [HttpPost]
        [Route("visitante")]
        public IHttpActionResult addVisitante([FromUri]Visitante vis)
        {
            if (vis != null)
            {
                IBLUsuario IBLUsu = new BLUsuario();
                IBLUsu.addUsuario(vis);
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
                IBLUsuario IBLUsu = new BLUsuario();
                IBLUsu.addUsuario(op);
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
                IBLUsuario IBLUsu = new BLUsuario();
                IBLUsu.addUsuario(admin);
                return Ok();
            }
            return BadRequest();
        }




        [HttpDelete]
        [Route("visitante")]
        public IHttpActionResult deleteVisitante([FromUri]Visitante vis)
        {
            if (vis != null)
            {
                IBLUsuario IBLUsu = new BLUsuario();
                IBLUsu.deleteUsuario(vis);
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
                IBLUsuario IBLUsu = new BLUsuario();
                IBLUsu.deleteUsuario(op);
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
                IBLUsuario IBLUsu = new BLUsuario();
                IBLUsu.deleteUsuario(admin);
                return Ok();
            }
            return BadRequest();
        }




        [HttpPut]
        [Route("visitante")]
        public IHttpActionResult updateVisitante([FromUri]Visitante vis)
        {
            if (vis != null)
            {
                IBLUsuario IBLUsu = new BLUsuario();
                IBLUsu.updateUsuario(vis);
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
                IBLUsuario IBLUsu = new BLUsuario();
                IBLUsu.updateUsuario(op);
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
                IBLUsuario IBLUsu = new BLUsuario();
                IBLUsu.updateUsuario(admin);
                return Ok();
            }
            return BadRequest();
        }
    }
}
