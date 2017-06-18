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
        public async Task<List<DatosDispositivo>> getDatosDispositivos(string tipoDato, string dispositivo, int pagina, string municipalidad)
        {
            var bd = new MongoClient().GetDatabase("cerebroDB");
            var datos = bd.GetCollection<DatosDispositivo>("DatosDispositivo");
            int skip = ((pagina * 20) - 20);
            var dispositivosMunicipalidad = (from e in bd.GetCollection<FuenteDeDato>("FuenteDeDato").AsQueryable() where e.municipalidad == municipalidad select e.Id).ToList();
            var builder = Builders<DatosDispositivo>.Filter;
            var filter = builder.In("dispositivoId", dispositivosMunicipalidad);
            if (tipoDato != null && tipoDato != "") filter = filter & builder.Eq("tipoDeDato", tipoDato);
            if (dispositivo != null && dispositivo != "") filter = filter & builder.Eq("nombre", dispositivo);
            return await datos.Find(filter).Skip(skip).Limit(20).Sort(Builders<DatosDispositivo>.Sort.Descending("datetime")).ToListAsync();
        }

        [HttpGet]
        [Route("datos/total")]
        public int getTotalDatosByTipo(string dispositivo) {
            var bd = new MongoClient().GetDatabase("cerebroDB");
            var datos = bd.GetCollection<DatosDispositivo>("DatosDispositivo");
            return (from x in datos.AsQueryable() where x.dispositivoId == dispositivo group x by x.dispositivoId into g select g.Count()).FirstOrDefault();
        }

        [HttpGet]
        [Route("eventos")]
        public async Task<List<DatosEvento>> getHistorialEventos(string evento, int pagina, string municipalidad) {
            var bd = new MongoClient().GetDatabase("cerebroDB");
            var datos = bd.GetCollection<DatosEvento>("DatosEvento");
            var eventos = (from e in bd.GetCollection<Evento>("Evento").AsQueryable() where e.municipalidad == municipalidad select e.Id).ToList();
            int skip = ((pagina * 20) - 20);
            var builder = Builders<DatosEvento>.Filter;
            var filter = builder.In("eventoId", eventos);
            if (evento != null && evento != "") filter = filter & builder.Eq("nombre", evento);
            return await datos.Find(filter).Skip(skip).Limit(20).Sort(Builders<DatosEvento>.Sort.Descending("datetime")).ToListAsync();
        }
    }
}
