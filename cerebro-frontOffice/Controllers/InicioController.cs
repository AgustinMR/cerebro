using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace cerebro_frontOffice.Controllers
{
    public class InicioController : Controller
    {
        public IActionResult Inicio()
        {
            return View();
        }
    }
}