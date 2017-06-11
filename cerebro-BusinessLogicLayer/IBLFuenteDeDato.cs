using cerebro;
using MongoDB.Bson;
using System.Collections.Generic;

namespace cerebro_BusinessLogicLayer
{
    interface IBLFuenteDeDato
    {
        bool addFuenteDeDato(FuenteDeDato f);
        bool updateFuenteDeDato(FuenteDeDato f);
        bool deleteFuenteDeDato(ObjectId id);
        FuenteDeDato getFuenteDeDato(ObjectId id);
        List<FuenteDeDato> getAllFuenteDeDato();
        List<FuenteDeDato> getAllFuenteDeDatoMuni(string muni);
        DatosDispositivo getDatosDispositivo(string id);
        byte[] getImg(string id);
    }
}
