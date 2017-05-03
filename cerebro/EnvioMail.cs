﻿using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cerebro
{
    public class EnvioMail : Accion
    {
        [BsonElement]
        public List<string> destinos { get; set; }
        [BsonElement]
        public string mensaje { get; set; }
    }
}
