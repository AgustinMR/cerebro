using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace cerebro_frontOffice.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            ViewData["Title"] = "";
            return View();
        }

        public IActionResult Login()
        {
            ViewData["Title"] = "Login";
            return View();
        }

        public IActionResult Registrarse()
        {
            ViewData["Title"] = "Registrarse";
            return View();
        }

        public IActionResult Municipalidades() {
            ViewData["Title"] = "Municipalidades";
            return View();
        }

        public IActionResult Error()
        {
            ViewData["Title"] = "Error";
            return View();
        }
    }
}
