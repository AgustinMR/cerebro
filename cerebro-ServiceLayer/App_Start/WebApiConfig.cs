using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace cerebro_ServiceLayer
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {

            config.EnableCors();
            config.MapHttpAttributeRoutes();
            //config.Formatters.Add(new BsonMediaTypeFormatter());

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
