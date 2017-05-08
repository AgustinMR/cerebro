using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace cerebro
{
    [DataContract]
    public class Agrupacion_Usuario
    {
        [DataMember]
        public string nombre_agrupacion { get; set; }
        [DataMember]
        public string nombre_municipalidad_agrupacion { get; set; }
        [DataMember]
        public string usuario_email { get; set; }
        [DataMember]
        public string nombre_municipalidad_usuario { get; set; }
        [DataMember]
        public bool admin { get; set; }
        [DataMember]
        public Agrupacion AGRUPACIONES { get; set; }
        [DataMember]
        public Usuario USUARIOS { get; set; }

        public Agrupacion_Usuario() { }

        public Agrupacion_Usuario(String nomAgrupacion, String nomMuniAgrupacion, String usuEmail, String nomMuniUsu, bool esAdmin) {
            this.nombre_agrupacion = nomAgrupacion;
            this.nombre_municipalidad_agrupacion = nomMuniAgrupacion;
            this.usuario_email = usuEmail;
            this.nombre_municipalidad_usuario = nomMuniUsu;
            this.admin = esAdmin;
        }
    }
}
