using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

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
                return Redirect("/Home/Error");
            }
            else if (usuarios.Enabled == true)
            {
                if (usuarios.Tipo == 0)
                {
                    if (string.IsNullOrWhiteSpace(pass))
                    {
                        var claims = new List<Claim>
                        {
                            new Claim("email", email),
                            new Claim("nombre", usuarios.Nombre),
                            new Claim("tipo", "Visitante"),
                            new Claim("muni", usuarios.NombreMunicipalidad)
                        };

                        var id = new ClaimsIdentity(claims, "password");
                        var p = new ClaimsPrincipal(id);

                        await HttpContext.Authentication.SignInAsync("Cookies", p);
                        return Redirect("/inicio/inicio");
                    }
                }
                else if (usuarios.Tipo == 1)
                {
                    MD5 md5 = MD5.Create();

                    byte[] inputBytes = System.Text.Encoding.ASCII.GetBytes(pass);

                    byte[] hash = md5.ComputeHash(inputBytes);

                    StringBuilder sb = new StringBuilder();
                    for (int i = 0; i < hash.Length; i++)
                    {
                        sb.Append(hash[i].ToString("x2"));
                    }
                    sb.ToString();
                    if (!string.IsNullOrWhiteSpace(pass) && sb.ToString() == usuarios.Password)
                    {
                        var claims = new List<Claim>
                        {
                            new Claim("email", email),
                            new Claim("nombre", usuarios.Nombre),
                            new Claim("tipo", "Operador"),
                            new Claim("muni", usuarios.NombreMunicipalidad)
                        };

                        var id = new ClaimsIdentity(claims, usuarios.Password);
                        var p = new ClaimsPrincipal(id);

                        await HttpContext.Authentication.SignInAsync("Cookies", p);
                        return Redirect("/inicio/inicio");
                    }
                }
                else
                {
                    return Redirect("/Home/Error");
                }

            }
            return Redirect("/Home/Error");
        }

        public async Task<IActionResult> Logout()
        {
            await HttpContext.Authentication.SignOutAsync("Cookies");
            return Redirect("/");
        }
    }
}