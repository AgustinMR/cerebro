using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace AngularSpa.Controllers
{
    public class HomeController : Controller
    {
        [Authorize]
        public IActionResult Index(string user)
        {
            ViewData["Title"] = "Home";
            return View();
        }

        public IActionResult SuperIndex() {
            ViewData["Title"] = "Inicio";
            return View();
        }

        public IActionResult Login() {
            ViewData["Title"] = "Login";
            return View();
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}
