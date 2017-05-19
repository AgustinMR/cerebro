using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace AngularSpa.Controllers
{
    public class PartialController : Controller
    {
        public IActionResult AgrupacionComponent() => PartialView();

        public IActionResult AppComponent() => PartialView();

        public IActionResult ChatComponent() => PartialView();

        public IActionResult OperadorComponent() => PartialView();

        public IActionResult ReporteComponent() => PartialView();

        public IActionResult InicioComponent() => PartialView();

        public IActionResult IndexComponent() => PartialView();
    }
}