﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace cerebro
{
    [DataContract]
    public class Agrupacion
    {
        [DataMember]
        public string nombre { get; set; }
        [DataMember]
        public string nombre_municipalidad { get; set; }
        public Municipalidad MUNICIPALIDADES { get; set; }
        public ICollection<Agrupacion_Usuario> AGRUPACIONES_USUARIOS { get; set; }

        public Agrupacion(){ }
        public Agrupacion(String nombre, String nombre_muni) {
            this.nombre = nombre;
            this.nombre_municipalidad = nombre_muni;
        }
    }
}
