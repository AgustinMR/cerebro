using System.Web.Http;
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
        [Route("")]
        public IHttpActionResult addUsuario([FromUri]Usuario usu)
        {
            if (usu != null)
            {
                IBLUsuario IBLUsu = new BLUsuario();
                IBLUsu.addUsuario(usu);
                return Ok();
            }
            return BadRequest();
        }
        
        [HttpDelete]
        [Route("")]
        public IHttpActionResult deleteUsuario([FromUri]Usuario usu)
        {
            if (usu != null)
            {
                IBLUsuario IBLUsu = new BLUsuario();
                IBLUsu.deleteUsuario(usu);
                return Ok();
            }
            return BadRequest();
        }
        
        [HttpPut]
        [Route("")]
        public IHttpActionResult updateUsuario([FromUri]Usuario usu)
        {
            if (usu != null)
            {
                IBLUsuario IBLUsu = new BLUsuario();
                IBLUsu.updateUsuario(usu);
                return Ok();
            }
            return BadRequest();
        }

    }
}
