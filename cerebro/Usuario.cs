using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace cerebro
{
    [DataContract]
    [KnownType(typeof(Visitante))]
    [KnownType(typeof(Operador))]
    [KnownType(typeof(Administrador))]
    public abstract class Usuario
    {
        [DataMember]
        public string email { get; set; }
        [DataMember]
        public string nombre_municipalidad { get; set; }
        [DataMember]
        public string nombre { get; set; }
        [DataMember]
        public bool enabled { get; set; }
        public ICollection<Agrupacion_Usuario> AGRUPACIONES_USUARIOS { get; set; }
        public Municipalidad MUNICIPALIDADES { get; set; }
        public ICollection<Privilegio> PRIVILEGIOS { get; set; }

    }
}
