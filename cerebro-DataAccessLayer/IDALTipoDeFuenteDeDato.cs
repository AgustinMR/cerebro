using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using cerebro;
using MongoDB.Bson;

namespace cerebro_DataAccessLayer
{
    public interface IDALTipoDeFuenteDeDato
    {
        bool addTipoDeFuenteDeDato(TipoDeFuenteDeDato t);
        bool updateTipoDeFuenteDeDato(TipoDeFuenteDeDato t);
        bool deleteTipoDeFuenteDeDato(ObjectId id);
        TipoDeFuenteDeDato getTipoDeFuenteDeDato(ObjectId id);
        List<TipoDeFuenteDeDato> getAllTipoDeFuenteDeDatos();
        List<TipoDeFuenteDeDato> getAllTipoDeFuenteDeDatos(string muni);
    }
}
