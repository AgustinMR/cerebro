using cerebro;
using cerebro_BusinessLogicLayer;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Cors;


namespace cerebro_ServiceLayer.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [RoutePrefix("api/dispositivos")]
    public class FuenteDeDatoController : ApiController
    {
        [System.Web.Http.HttpPost]
        [Route("")]
        public bool addFuenteDeDato(string municipalidad, string ubicacion, string userAgent, string direccionIP, string tipo, string nombre)
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
            return new BLFuenteDeDato().addFuenteDeDato(f);
        }

        [HttpDelete]
        [Route("{id}")]
        public bool deleteFuenteDeDato(string id)
        {
            return new BLFuenteDeDato().deleteFuenteDeDato(ObjectId.Parse(id));
        }

        [System.Web.Http.HttpGet]
        [Route("")]
        public List<FuenteDeDato> getAllFuenteDeDato()
        {
            return new BLFuenteDeDato().getAllFuenteDeDato();
        }

        [System.Web.Http.HttpGet]
        [Route("muni/{id}")]
        public List<FuenteDeDato> getAllFuenteDeDatoMuni(string id)
        {
            return new BLFuenteDeDato().getAllFuenteDeDatoMuni(id);
        }

        [System.Web.Http.HttpGet]
        [Route("municipalidad/{municipalidad}/{tipo}")]
        public List<FuenteDeDato> getDispositivosByMunicipalidad(string municipalidad, string tipo)
        {
            return new BLFuenteDeDato().getDispositivosByMunicipalidad(municipalidad, tipo);
        }

        [System.Web.Http.HttpGet]
        [Route("{id}")]
        public FuenteDeDato getFuenteDeDato(string id)
        {
            return new BLFuenteDeDato().getFuenteDeDato(ObjectId.Parse(id));
        }

        [System.Web.Http.HttpPut]
        [Route("")]
        public bool updateFuenteDeDato(string ubicacion, string userAgent, string direccionIP, string id)
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
            return new BLFuenteDeDato().updateFuenteDeDato(ff);
        }

        [System.Web.Http.HttpGet]
        [Route("datos/{id}")]
        public DatosDispositivo getDatosDispositivo(string id)
        {
            return new BLFuenteDeDato().getDatosDispositivo(id);
        }

        [System.Web.Http.HttpGet]
        [Route("img/{id}")]
        public byte[] getImg(string id)
        {
            return new BLFuenteDeDato().getImg(id);
        }
    }
}