using cerebro;
using MongoDB.Bson;
using System.Collections.Generic;

namespace cerebro_BusinessLogicLayer
{
    public interface IBLTipoDeFuenteDeDato
    {
        bool addTipoDeFuenteDeDato(TipoDeFuenteDeDato t);
        bool updateTipoDeFuenteDeDato(TipoDeFuenteDeDato t);
        bool deleteTipoDeFuenteDeDato(ObjectId id);
        TipoDeFuenteDeDato getTipoDeFuenteDeDato(ObjectId id);
        List<TipoDeFuenteDeDato> getAllTipoDeFuenteDeDatos();
    }
}
