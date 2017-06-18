using cerebro;
using cerebro_BusinessLogicLayer;
using MongoDB.Bson;
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
    [RoutePrefix("api/dispositivos")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class FuenteDeDatoController : ApiController
    {
        [HttpPost]
        [Route("")]
        public bool addFuenteDeDato(string municipalidad, string ubicacion, string userAgent, string direccionIP, string tipo, string nombre, string privilegios, Boolean simulado)
        {
            FuenteDeDato f = new FuenteDeDato();
            f.municipalidad = municipalidad;
            string[] tmp = ubicacion.Split(',');
            string[] tmp2 = tmp[0].Split('.');
            string[] tmp3 = tmp[1].Split('.');
            double[] doubleArray = new double[2];
            doubleArray[0] = Double.Parse(tmp2[0].Trim() + "," + tmp2[1].Trim());
            doubleArray[1] = Double.Parse(tmp3[0].Trim() + "," + tmp3[1].Trim());
            f.ubicacion = doubleArray;
            f.userAgent = userAgent;
            f.direccionIP = direccionIP;
            f.tipo = new ObjectId(tipo);
            f.nombre = nombre;
            f.privilegios = privilegios;
            f.simulado = simulado;
            return new BLFuenteDeDato().addFuenteDeDato(f);
        }

        [HttpDelete]
        [Route("{id}")]
        public bool deleteFuenteDeDato(string id)
        {
            return new BLFuenteDeDato().deleteFuenteDeDato(ObjectId.Parse(id));
        }

        [HttpGet]
        [Route("")]
        public List<FuenteDeDato> getAllFuenteDeDato()
        {
            return new BLFuenteDeDato().getAllFuenteDeDato();
        }

        [HttpGet]
        [Route("muni/{id}")]
        public List<FuenteDeDato> getAllFuenteDeDatoMuni(string id)
        {
            return new BLFuenteDeDato().getAllFuenteDeDatoMuni(id);
        }

        [HttpGet]
        [Route("municipalidad/{municipalidad}/{tipo}")]
        public async Task<List<FuenteDeDato>> getDispositivosByMunicipalidadAsync(string municipalidad, string tipo)
        {
            return await new BLFuenteDeDato().getDispositivosByMunicipalidad(municipalidad, tipo);
        }

        [HttpGet]
        [Route("{id}")]
        public FuenteDeDato getFuenteDeDato(string id)
        {
            return new BLFuenteDeDato().getFuenteDeDato(ObjectId.Parse(id));
        }

        [HttpPut]
        [Route("")]
        public bool updateFuenteDeDato(string ubicacion, string userAgent, string direccionIP, string id, string privilegios, string nombre)
        {
            FuenteDeDato ff = new BLFuenteDeDato().getFuenteDeDato(ObjectId.Parse(id));
            ff.userAgent = userAgent;
            ff.direccionIP = direccionIP;
            string[] tmp = ubicacion.Split(',');
            string[] tmp2 = tmp[0].Split('.');
            string[] tmp3 = tmp[1].Split('.');
            double[] doubleArray = new double[2];
            doubleArray[0] = Double.Parse(tmp2[0].Trim() + "," + tmp2[1].Trim());
            doubleArray[1] = Double.Parse(tmp3[0].Trim() + "," + tmp3[1].Trim());
            ff.ubicacion = doubleArray;
            ff.privilegios = privilegios;
            ff.nombre = nombre;
            return new BLFuenteDeDato().updateFuenteDeDato(ff);
        }

        [HttpGet]
        [Route("datos/{id}")]
        public DatosDispositivo getDatosDispositivo(string id)
        {
            return new BLFuenteDeDato().getDatosDispositivo(id);
        }

        [HttpGet]
        [Route("img/{id}")]
        public byte[] getImg(string id)
        {
            return new BLFuenteDeDato().getImg(id);
        }
    }
}
