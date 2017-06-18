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
        public List<Object[]> getTotalDatosByTipo(string tipo, string municipalidad) {
            var bd = new MongoClient().GetDatabase("cerebroDB");
            TipoDeDato tipoD;
            if (tipo.ToLower() == "numerico") tipoD = TipoDeDato.NUMERICO;
            else if (tipo.ToLower() == "texto") tipoD = TipoDeDato.TEXTO;
            else if (tipo.ToLower() == "imagen") tipoD = TipoDeDato.IMAGEN;
            else tipoD = TipoDeDato.VIDEO;
            var tipos = (from t in bd.GetCollection<TipoDeFuenteDeDato>("TipoDeFuenteDeDato").AsQueryable() where t.municipalidad == municipalidad where t.tipo == tipoD select t.Id).ToList();
            var dispositivos = (from e in bd.GetCollection<FuenteDeDato>("FuenteDeDato").AsQueryable() where e.municipalidad == municipalidad where tipos.Contains(e.tipo) select e).ToList();
            var builder = Builders<DatosDispositivo>.Filter;
            var datos = bd.GetCollection<DatosDispositivo>("DatosDispositivo");
            List<Object[]> ret = new List<Object[]>();
            foreach(var d in dispositivos) {
                int r = (from x in datos.AsQueryable() where x.tipoDeDato == tipo where x.nombre == d.nombre group x by x.nombre into g select g.Count()).FirstOrDefault();
                int total = (from x in datos.AsQueryable() where x.tipoDeDato == tipo where tipos.Contains(d.tipo) select x).Count();
                double i = r;
                if (total > r) i = ((r*total)/100);
                ret.Add(new Object[] {d.nombre, r});
            }
            return ret;
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
