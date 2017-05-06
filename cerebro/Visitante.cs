﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace cerebro
{
    [DataContract]
    public class Visitante : Usuario
    {
        public Visitante() { }

        public Visitante(String email, String nombre_muni, String nombre)
        {
            this.email = email;
            this.nombre_municipalidad = nombre_muni;
            this.nombre = nombre;
        }
    }
}
