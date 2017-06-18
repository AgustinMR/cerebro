using System.Web.Http;
using System.Web.Http.Cors;
using cerebro_BusinessLogicLayer;
using cerebro;
using System.Collections.Generic;
using cerebro_ServiceLayer.Models;

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
                if (IBLUsu.addUsuario(vis))
                {
                    return Ok(TipoRetorno.OK.ToString());
                }
                return Ok("false");
            }
            return BadRequest(TipoRetorno.ERROR_DATOS_NULL.ToString());
        }

        [HttpPost]
        [Route("operador")]
        public IHttpActionResult addOperador([FromUri]Operador op)
        {
            if (op != null)
            {
                IBLUsuario IBLUsu = new BLUsuario();
                if (IBLUsu.addUsuario(op))
                {
                    return Ok(TipoRetorno.OK.ToString());
                }
                return InternalServerError();
            }
            return BadRequest(TipoRetorno.ERROR_DATOS_NULL.ToString());
        }

        [HttpPost]
        [Route("administrador")]
        public IHttpActionResult addAdministrador([FromUri]Administrador admin)
        {
            if (admin != null)
            {
                IBLUsuario IBLUsu = new BLUsuario();
                if (IBLUsu.addUsuario(admin))
                {
                    return Ok(TipoRetorno.OK.ToString());
                }
                return InternalServerError();
            }
            return BadRequest(TipoRetorno.ERROR_DATOS_NULL.ToString());
        }

        [HttpDelete]
        [Route("visitante")]
        public IHttpActionResult deleteVisitante([FromUri]Visitante vis)
        {
            if (vis != null)
            {
                IBLUsuario IBLUsu = new BLUsuario();
                if (IBLUsu.deleteUsuario(vis))
                {
                    return Ok(TipoRetorno.OK.ToString());
                }
                return InternalServerError();
            }
            return BadRequest(TipoRetorno.ERROR_DATOS_NULL.ToString());
        }

        [HttpDelete]
        [Route("operador")]
        public IHttpActionResult deleteOperador([FromUri]Operador op)
        {
            if (op != null)
            {
                IBLUsuario IBLUsu = new BLUsuario();
                if (IBLUsu.deleteUsuario(op))
                {
                    return Ok(TipoRetorno.OK.ToString());
                }
                return InternalServerError();
            }
            return BadRequest(TipoRetorno.ERROR_DATOS_NULL.ToString());
        }

        [HttpDelete]
        [Route("administrador")]
        public IHttpActionResult deleteAdministrador([FromUri]Administrador admin)
        {
            if (admin != null)
            {
                IBLUsuario IBLUsu = new BLUsuario();
                if (IBLUsu.deleteUsuario(admin))
                {
                    return Ok(TipoRetorno.OK.ToString());
                }
                return InternalServerError();
            }
            return BadRequest(TipoRetorno.ERROR_DATOS_NULL.ToString());
        }

        [HttpPut]
        [Route("visitante")]
        public IHttpActionResult updateVisitante([FromUri]Visitante vis)
        {
            if (vis != null)
            {
                IBLUsuario IBLUsu = new BLUsuario();
                if (IBLUsu.updateUsuario(vis))
                {
                    return Ok(TipoRetorno.OK.ToString());
                }
                return InternalServerError();
            }
            return BadRequest(TipoRetorno.ERROR_DATOS_NULL.ToString());
        }

        [HttpPut]
        [Route("operador")]
        public IHttpActionResult updateOperador([FromUri]Operador op)
        {
            if (op != null)
            {
                IBLUsuario IBLUsu = new BLUsuario();
                if (IBLUsu.updateUsuario(op))
                {
                    return Ok(TipoRetorno.OK.ToString());
                }
                return InternalServerError();
            }
            return BadRequest(TipoRetorno.ERROR_DATOS_NULL.ToString());
        }

        [HttpPut]
        [Route("administrador")]
        public IHttpActionResult updateAdministrador([FromUri]Administrador admin)
        {
            if (admin != null)
            {
                IBLUsuario IBLUsu = new BLUsuario();
                if (IBLUsu.updateUsuario(admin))
                {
                    return Ok(TipoRetorno.OK.ToString());
                }
                return InternalServerError();
            }
            return BadRequest(TipoRetorno.ERROR_DATOS_NULL.ToString());
        }

        [HttpPost]
        [Route("loginVisitante")]
        public bool loginVisitante([FromUri]Visitante vis)
        {
            if (vis != null)
            {
                IBLUsuario IBLUsu = new BLUsuario();
                return IBLUsu.loginUsuario(vis);
            }
            return false;
        }

        [HttpPost]
        [Route("loginOperador")]
        public bool loginOperador([FromUri]Operador op)
        {
            if (op != null)
            {
                IBLUsuario IBLUsu = new BLUsuario();
                return IBLUsu.loginUsuario(op);
            }
            return false;
        }

        [HttpPost]
        [Route("loginAdministrador")]
        public bool loginAdministrador([FromUri]Administrador admin)
        {
            if (admin != null)
            {
                IBLUsuario IBLUsu = new BLUsuario();
                return IBLUsu.loginUsuario(admin);
            }
            return false;
        }

        [HttpGet]
        [Route("obtener")]
        public Usuario getUsuario(string email, string muni)
        {
            return new BLUsuario().obtenerUsuario(email, muni);
        }

        [HttpGet]
        [Route("")]
        public List<Usuario> getUsuarios()
        {
            return new BLUsuario().obtenerUsuarios();
        }

        [HttpGet]
        [Route("municipalidad/{municipalidad}")]
        public List<Usuario> getUsuarios(string municipalidad)
        {
            return new BLUsuario().obtenerUsuarios(municipalidad);
        }

        [HttpPut]
        [Route("enabled")]
        public bool toggleUsuarioEnabled(string email, string muni, bool enabled)
        {
            return new BLUsuario().toggleUsuarioEnabled(email, muni, enabled);
        }

        [HttpPut]
        [Route("privilegio")]
        public bool setPrivilegioUsuario(string email, string muni, string privilegio)
        {
            return new BLUsuario().setPrivilegioUsuario(email, muni, privilegio);
        }

        [HttpGet]
        [Route("privilegios")]
        public List<Privilegio> getPrivilegios(string muni)
        {
            return new BLUsuario().getPrivilegios(muni);
        }

        [HttpGet]
        [Route("privilegiosUsu")]
        public ICollection<Privilegio> getPrivilegiosUsuarios(string email, string muni)
        {
            return new BLUsuario().getPrivilegiosUsuarios(email, muni);
        }
    }
}
