using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace cerebro_frontOffice.Controllers
{
    public class AgrupacionController : Controller
    {
        public IActionResult Agrupacion()
        {
            ViewData["Title"] = "Agrupacion";
            return View();
        }
    }
}