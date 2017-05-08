using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace cerebro
{
    [DataContract]
    public class Administrador : Usuario
    {
        [DataMember]
        public String password { get; set; }

        public Administrador() { }
        public Administrador(String email, String nombre_muni, String nombre, String password)
        {
            this.email = email;
            this.nombre_municipalidad = nombre_muni;
            this.nombre = nombre;
            this.password = password;
        }
    }
}
