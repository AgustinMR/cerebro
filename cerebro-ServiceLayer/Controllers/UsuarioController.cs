﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using cerebro;
using cerebro_BusinessLogicLayer;

namespace cerebro_ServiceLayer.Controllers
{
    [RoutePrefix("api/usuarios")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class UsuarioController : ApiController
    {

        [HttpPost]
        [Route("")]
        public IHttpActionResult addAgrupacion([FromUri]Usuario usu)
        {
            if (usu != null)
            {
                IBLUsuario IBLAgru = new BLUsuario();
                IBLAgru.addUsuario(usu);
                return Ok();
            }
            return BadRequest();
        }
        
        [HttpDelete]
        [Route("")]
        public IHttpActionResult deleteVisitante([FromUri]Usuario usu)
        {
            if (usu != null)
            {
                IBLUsuario IBLAgru = new BLUsuario();
                IBLAgru.deleteUsuario(usu);
                return Ok();
            }
            return BadRequest();
        }
        
        [HttpPut]
        [Route("")]
        public IHttpActionResult updateVisitante([FromUri]Usuario usu)
        {
            if (usu != null)
            {
                IBLUsuario IBLAgru = new BLUsuario();
                IBLAgru.updateUsuario(usu);
                return Ok();
            }
            return BadRequest();
        }

    }
}
