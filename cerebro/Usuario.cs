using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace cerebro
{
    [DataContract]
    public abstract class Usuario
    {
        [DataMember]
        public string email { get; set; }
        [DataMember]
        public string nombre_municipalidad { get; set; }
        [DataMember]
        public string nombre { get; set; }
        [DataMember]
        public ICollection<Agrupacion_Usuario> AGRUPACIONES_USUARIOS { get; set; }
        [DataMember]
        public Municipalidad MUNICIPALIDADES { get; set; }

    }
}
