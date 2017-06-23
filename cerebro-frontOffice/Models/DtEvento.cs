using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cerebro.frontOffice.Models
{
    public class DtEvento
    {
        public string nombre { get; set; }
        public DateTime fechaHora { get; set; }
        public List<string> dispositivos { get; set; }
        public List<string> privilegios { get; set; }
        public double[][] geom { get; set; }

    }
}
