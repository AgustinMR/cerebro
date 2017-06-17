using cerebro_BusinessLogicLayer;
using System.Web.Http;
using System.Web.Http.Cors;

namespace cerebro_ServiceLayer.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class DatosEventoController : ApiController
    {
        [HttpPost]
        public void dispararAccionEvento(string idEve)
        {
            new BLEvento().dispararAccionEvento(idEve);
        }
    }
}