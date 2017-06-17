using cerebro;
using cerebro_BusinessLogicLayer;
using cerebro_ServiceLayer.Models;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Cors;

namespace cerebro_ServiceLayer.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [RoutePrefix("api/usuarios")]
    public class UsuarioController : ApiController
    {
        [System.Web.Http.HttpPost]
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

        [System.Web.Http.HttpPost]
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

        [System.Web.Http.HttpPost]
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

        [System.Web.Http.HttpDelete]
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

        [System.Web.Http.HttpDelete]
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

        [System.Web.Http.HttpDelete]
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

        [System.Web.Http.HttpPut]
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

        [System.Web.Http.HttpPut]
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

        [System.Web.Http.HttpPut]
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

        [System.Web.Http.HttpPost]
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

        [System.Web.Http.HttpPost]
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

        [System.Web.Http.HttpPost]
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

        [System.Web.Http.HttpGet]
        [Route("obtener")]
        public Usuario getUsuario(string email)
        {
            return new BLUsuario().obtenerUsuario(email);
        }

        [System.Web.Http.HttpGet]
        [Route("")]
        public List<Usuario> getUsuarios()
        {
            return new BLUsuario().obtenerUsuarios();
        }

        [System.Web.Http.HttpGet]
        [Route("municipalidad/{municipalidad}")]
        public List<Usuario> getUsuarios(string municipalidad)
        {
            return new BLUsuario().obtenerUsuarios(municipalidad);
        }

        [System.Web.Http.HttpPut]
        [Route("enabled")]
        public bool toggleUsuarioEnabled(string email, bool enabled)
        {
            return new BLUsuario().toggleUsuarioEnabled(email, enabled);
        }

        [System.Web.Http.HttpPut]
        [Route("privilegio")]
        public bool setPrivilegioUsuario(string email, string privilegio)
        {
            return new BLUsuario().setPrivilegioUsuario(email, privilegio);
        }
    }
}