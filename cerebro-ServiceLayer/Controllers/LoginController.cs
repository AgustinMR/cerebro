using cerebro_BusinessLogicLayer;
using System.Web.Http;
using System.Web.Http.Cors;

namespace cerebro_ServiceLayer.Controllers
{
    [RoutePrefix("api/login")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class LoginController : ApiController
    {
        [HttpPost]
        [Route("")]
        public bool autenticarUsuario(string email, string password)
        {
            return true;
        }
    }
}
