using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace cerebro_frontOffice.Controllers
{
    public class AgrupacionController : Controller
    {
        [Authorize]
        public IActionResult Agrupacion()
        {
            ViewData["Title"] = "Agrupacion";
            return View();
        }
    }
}