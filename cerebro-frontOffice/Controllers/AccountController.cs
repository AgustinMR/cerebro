using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using RestSharp;

namespace cerebro_frontOffice.Controllers
{
    public class AccountController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Login(string email, string pass, string muni, string returnUrl = null)
        {
            ViewData["ReturnUrl"] = returnUrl;

            if (!string.IsNullOrWhiteSpace(email) && string.IsNullOrWhiteSpace(pass) && !string.IsNullOrWhiteSpace(muni))
            {
                var client = new RestClient("https://www.cerebro-serviceLayer.com/api/usuarios/loginVisitante?email=" + email + "&nombre_municipalidad=" + muni);
                var request = new RestRequest("", Method.POST);
                var b = 0;
                client.ExecuteAsync(request, response =>
                {
                    if (response.Content.Equals("True"))
                    {
                        b = 1;
                    }
                    else
                    {
                        b = 2;
                    }
                });
                while (b == 0)
                {
                }
            }
            else if (!string.IsNullOrWhiteSpace(email) && !string.IsNullOrWhiteSpace(pass) && !string.IsNullOrWhiteSpace(muni))
            {
                var client = new RestClient("https://www.cerebro-serviceLayer.com/api/usuarios/loginOperador?email=" + email + "&nombre_municipalidad=" + muni +"&password=" + pass);
                var request = new RestRequest("", Method.POST);
                var b = 0;
                client.ExecuteAsync(request, response =>
                {
                    if (response.Content.Equals("True"))
                    {
                        b = 1;
                    }
                    else
                    {
                        b = 2;
                    }
                });
                while (b == 0)
                {
                }
            }



            if (!string.IsNullOrWhiteSpace(email) &&
                email == pass)
            {
                var claims = new List<Claim>
                {
                    new Claim("sub", "19828281888"),
                    new Claim("given_name", "Dominick"),
                    new Claim("role", "Geek")
                };

                var id = new ClaimsIdentity(claims, "password");
                var p = new ClaimsPrincipal(id);

                await HttpContext.Authentication.SignInAsync("Cookies", p);

                return LocalRedirect("/");
            }

            return View();
        }

        public async Task<IActionResult> Logout()
        {
            await HttpContext.Authentication.SignOutAsync("Cookies");
            return Redirect("/");
        }
    }
}