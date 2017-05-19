using Microsoft.AspNet.SignalR;
using System.Web.Http;

namespace cerebro_SignalrServer
{
    public class ChatSignalrController : ApiController
    {

        private IHubContext context;

        public ChatSignalrController()
        {
            context = GlobalHost.ConnectionManager.GetHubContext<ChatSignalrHub>();
        }

        [Route("")]
        [HttpPost]
        public IHttpActionResult MensajeNuevoEvent([FromUri]ChatMensaje c)
        {
            PublishEvent(c.agrupacion, "mensaje.nuevo", c);
            return Ok("mensaje.nuevo");
        }

        [Route("")]
        [HttpGet]
        public IHttpActionResult UserConnectedTask()
        {
            PublishEvent("MENSAJE_NUEVO", "usuario.conectado");
            return Ok("usuario.conectado");
        }

        private void PublishEvent(string c, string n)
        {
            context.Clients.Group(c).OnEvent(c, new EventMessage
            {
                channel = c,
                name = n,
                data = c.ToString()
            });
        }

        private void PublishEvent(string c, string n, ChatMensaje e)
        {
            context.Clients.Group(c).OnEvent(c, new EventMessage
            {
                channel = c,
                name = n,
                data = e
            });
        }
    }
}