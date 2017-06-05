using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using PusherServer;

namespace cerebro_frontOffice.Controllers
{
    [Route("api/dispositivos")]
    [EnableCors("mypolicy")]
    public class DispositivosController : Controller
    {
        [HttpPost]
        [Route("")]
        public IActionResult Trigger(DatosDispositivo datos)
        {
            var options = new PusherOptions();
            options.Cluster = "mt1";
            var pusher = new Pusher("342739", "474881b81d9d92dd2713", "c14d6443376ba1f06b0f", options);
            var result = pusher.TriggerAsync(datos.id, "dato-nuevo", datos);
            return Ok("Ok");
        }
    }
}