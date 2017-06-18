using System.Runtime.Serialization;

namespace cerebro
{
    [DataContract]
    public class PrivilegiosUsuarios
    {
        [DataMember]
        public string Privilegio_nombre { get; set; }
        [DataMember]
        public string Privilegio_nombre_municipalidad { get; set; }
        [DataMember]
        public string Usuario_email { get; set; }
        [DataMember]
        public string Usuario_nombre_municipalidad { get; set; }
    }
}
