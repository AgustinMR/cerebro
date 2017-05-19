using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace cerebro_SignalrServer
{
    public class EventMessage
    {
        public string channel { get; set; }

        public DateTimeOffset datetime { get; set; }

        public string name { get; set; }

        public object data
        {
            get { return _data; }
            set
            {
                _data = value;
                this.json = JsonConvert.SerializeObject(_data);
            }
        }

        private object _data;
        public string json { get; private set; }

        public EventMessage()
        {
            datetime = DateTimeOffset.Now;
        }
    }
}