using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace cerebro
{
    [DataContract]
    public class DatosDispositivo
    {
        [BsonId]
        [DataMember]
        public ObjectId Id { set; get; }
        [BsonElement]
        [DataMember]
        public string dispositivoId { get; set; }
        [BsonElement]
        [DataMember]
        public string tipoDeDato { get; set; }
        [BsonElement]
        [DataMember]
        public Object medida { get; set; }
        [BsonElement]
        [DataMember]
        public DateTime datetime { get; set; }

        public DatosDispositivo(){}

        public DatosDispositivo(string id, string TipoDeDato, Object medida)
        {
            this.dispositivoId = id;
            this.tipoDeDato = TipoDeDato;
            this.medida = medida;
        }
    }
}
