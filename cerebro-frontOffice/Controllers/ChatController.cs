using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace cerebro_frontOffice.Controllers
{
    public class ChatController : Controller
    {
        [Authorize]
        public IActionResult Chat()
        {
            ViewData["Title"] = "Chat";
            return View();
        }
    }
}