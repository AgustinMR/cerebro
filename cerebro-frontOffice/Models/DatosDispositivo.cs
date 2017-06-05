using System;
using System.Runtime.Serialization;

namespace cerebro_frontOffice
{
    [DataContract]
    public class DatosDispositivo
    {
        [DataMember]
        public string id { get; set; }
        [DataMember]
        public string TipoDeDato { get; set; }
        [DataMember]
        public string medida {get; set; }
        [DataMember]
        public DateTimeOffset datetime { get; set; }

        public DatosDispositivo()
        {
            this.datetime = DateTimeOffset.Now;
        }

        public DatosDispositivo(string id, string TipoDeDato, string medida)
        {
            this.id = id;
            this.TipoDeDato = TipoDeDato;
            this.medida = medida;
            this.datetime = DateTimeOffset.Now;
        }
    }
}