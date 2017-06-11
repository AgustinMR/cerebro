﻿using cerebro;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cerebro_DataAccessLayer
{
    public interface IDALFuenteDeDato
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
