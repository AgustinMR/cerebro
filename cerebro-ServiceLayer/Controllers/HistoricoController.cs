using cerebro;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;

namespace cerebro_ServiceLayer.Controllers
{
    [RoutePrefix("api/historial")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class HistoricoController : ApiController
    {
        [HttpGet]
        [Route("datos")]
        public async Task<List<DatosDispositivo>> getDatosDispositivos(string tipoDato, string dispositivo,int pagina)
        {
            var mongo = new MongoClient();
            var bd = mongo.GetDatabase("cerebroDB");
            var datos = bd.GetCollection<DatosDispositivo>("DatosDispositivo");
            int skip = ((pagina * 20) - 20);
            if (tipoDato != null && tipoDato != "")
            {
                var filter = Builders<DatosDispositivo>.Filter.Eq("tipoDeDato", tipoDato);
                if (dispositivo != null && dispositivo != "") {
                    filter = filter & Builders<DatosDispositivo>.Filter.Eq("nombre", dispositivo);
                    return await datos.Find(filter).Skip(skip).Limit(20).Sort(Builders<DatosDispositivo>.Sort.Descending("datetime")).ToListAsync();
                }
                return await datos.Find(filter).Skip(skip).Limit(20).Sort(Builders<DatosDispositivo>.Sort.Descending("datetime")).ToListAsync();
            }
            else return await datos.Find(new BsonDocument()).Skip(skip).Limit(20).Sort(Builders<DatosDispositivo>.Sort.Descending("datetime")).ToListAsync();
        }
    }
}
