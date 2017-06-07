using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using RestSharp;
using Microsoft.EntityFrameworkCore;

namespace cerebro_frontOffice.Controllers
{
    public class AccountController : Controller
    {
        private readonly cerebroDBContext _context;

        public AccountController(cerebroDBContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Login(string email, string pass, string muni)
        {

            var usuarios = await _context.Usuarios
                .Include(u => u.NombreMunicipalidadNavigation)
                .SingleOrDefaultAsync(m => m.Email == email && m.NombreMunicipalidad == muni);

            if (usuarios == null)
            {
                return Redirect("/");
            }
            else
            {
                if (usuarios.Tipo == 0)
                {
                    if (string.IsNullOrWhiteSpace(pass))
                    {
                        var claims = new List<Claim>
                        {
                            new Claim("email", email),
                            new Claim("nombre", usuarios.Nombre),
                            new Claim("tipo", "Visitante")
                        };

                        var id = new ClaimsIdentity(claims, "password");
                        var p = new ClaimsPrincipal(id);

                        await HttpContext.Authentication.SignInAsync("Cookies", p);
                        return Redirect("/inicio");
                    }
                }
                else if (usuarios.Tipo == 1)
                {
                    if (!string.IsNullOrWhiteSpace(pass) && pass == usuarios.Password)
                    {
                        var claims = new List<Claim>
                        {
                            new Claim("email", email),
                            new Claim("nombre", usuarios.Nombre),
                            new Claim("tipo", "Operador")
                        };

                        var id = new ClaimsIdentity(claims, usuarios.Password);
                        var p = new ClaimsPrincipal(id);

                        await HttpContext.Authentication.SignInAsync("Cookies", p);
                        return Redirect("/inicio");
                    }
                }
                else
                {
                    return Redirect("/");
                }

            }
            return Redirect("/");
        }

        public async Task<IActionResult> Logout()
        {
            await HttpContext.Authentication.SignOutAsync("Cookies");
            return Redirect("/");
        }
    }
}