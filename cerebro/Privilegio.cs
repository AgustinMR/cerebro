using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace cerebro
{
    [DataContract]
    public class Privilegio
    {
        [DataMember]
        public string nombre { get; set; }
        [DataMember]
        public string nombre_municipalidad { get; set; }

        public Municipalidad MUNICIPALIDADES { get; set; }
        public ICollection<Usuario> USUARIOS { get; set; }

        public Privilegio() {}

        public Privilegio(string nombre, string municipalidad)
        {
            this.nombre = nombre;
            this.nombre_municipalidad = municipalidad;
        }
    }
}
