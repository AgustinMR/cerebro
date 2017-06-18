using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using cerebro;
using MongoDB.Bson;
using cerebro_DataAccessLayer;

namespace cerebro_BusinessLogicLayer
{
    public class BLFuenteDeDato : IBLFuenteDeDato
    {

        IDALFuenteDeDato dal = null;

        public BLFuenteDeDato() {
            dal = new DALFuenteDeDato();
        }

        public bool addFuenteDeDato(FuenteDeDato f)
        {
            return dal.addFuenteDeDato(f);
        }

        public bool deleteFuenteDeDato(ObjectId id)
        {
            return dal.deleteFuenteDeDato(id);
        }

        public List<FuenteDeDato> getAllFuenteDeDato()
        {
            return dal.getAllFuenteDeDato();
        }

        public FuenteDeDato getFuenteDeDato(ObjectId id)
        {
            return dal.getFuenteDeDato(id);
        }

        public bool updateFuenteDeDato(FuenteDeDato f)
        {
            return dal.updateFuenteDeDato(f);
        }

        public List<FuenteDeDato> getAllFuenteDeDatoMuni(string muni, string email)
        {
            return dal.getAllFuenteDeDatoMuni(muni, email);
        }

        public List<FuenteDeDato> getAllFuenteDeDatoMuni(string muni)
        {
            return dal.getAllFuenteDeDatoMuni(muni);
        }

        public DatosDispositivo getDatosDispositivo(string id)
        {
            return dal.getDatosDispositivo(id);
        }

        public byte[] getImg(string id)
        {
            return dal.getImg(id);
        }

        public async Task<List<FuenteDeDato>> getDispositivosByMunicipalidad(string municipalidad, string tipo)
        {
            return await dal.getDispositivosByMunicipalidad(municipalidad, tipo);
        }
    }
}
