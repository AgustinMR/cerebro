using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace cerebro
{
    [DataContract]
    public class Municipalidad
    {
        [DataMember]
        public String nombre { get; set; }
        [DataMember]
        public String ubicacion { get; set; }
        [DataMember]
        public ICollection<Agrupacion> AGRUPACIONES { get; set; }
        [DataMember]
        public ICollection<Usuario> USUARIOS { get; set; }

        public Municipalidad(){
        }

        public Municipalidad(String nombre, String ubicacion)
        {
            this.nombre = nombre;
            this.ubicacion = ubicacion;
        }
    }
}
