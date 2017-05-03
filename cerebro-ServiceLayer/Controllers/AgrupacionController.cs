using System;
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
    [RoutePrefix("api/agrupaciones")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class AgrupacionController : ApiController
    {
        [HttpPost]
        [Route("nueva")]
        //si esto da problemas separar los artributos de las dos calses y recivirlos por como si fuesen muchos datos sin relacion
        public IHttpActionResult addAgrupacion([FromUri]Agrupacion grupo, [FromUri]Usuario usu)
        {
            if (grupo != null && usu != null)
            {
                IBLAgrupacion IBLAgru = new BLAgrupacion();
                IBLAgru.addAgrupacion(grupo, usu);
                return Ok();
            }
            return BadRequest();
        }

        [HttpPost]
        [Route("nuevoUsuario")]
        //si esto da problemas separar los artributos de las dos calses y recivirlos por como si fuesen muchos datos sin relacion
        public IHttpActionResult addUsuarioAgrupacion([FromUri]Agrupacion grupo, [FromUri]Usuario usu)
        {
            if (grupo != null && usu != null)
            {
                IBLAgrupacion IBLAgru = new BLAgrupacion();
                IBLAgru.addUsuariosAgrupacion(grupo, usu);
                return Ok();
            }
            return BadRequest();
        }

        [HttpPut]
        [Route("")]
        //si esto da problemas separar los artributos de las dos calses y recivirlos por como si fuesen muchos datos sin relacion
        public IHttpActionResult updateAdminAgrupacion([FromUri]Agrupacion grupo, [FromUri]Usuario usu, [FromUri] bool esAdmin)
        {
            if (grupo != null && usu != null)
            {
                IBLAgrupacion IBLAgru = new BLAgrupacion();
                IBLAgru.updateAdminAgrupacion(grupo, usu, esAdmin);
                return Ok();
            }
            return BadRequest();
        }

        [HttpDelete]
        [Route("deleteUsuario")]
        //si esto da problemas separar los artributos de las dos calses y recivirlos por como si fuesen muchos datos sin relacion
        public IHttpActionResult deleteUsuarioAgrupacion([FromUri]Agrupacion grupo, [FromUri]Usuario usu)
        {
            if (grupo != null && usu != null)
            {
                IBLAgrupacion IBLAgru = new BLAgrupacion();
                IBLAgru.deleteUsuarioAgrupacion(grupo, usu);
                return Ok();
            }
            return BadRequest();
        }

        [HttpDelete]
        [Route("deleteAgrupacion")]
        //si esto da problemas separar los artributos de las dos calses y recivirlos por como si fuesen muchos datos sin relacion
        public IHttpActionResult deleteAgrupacion([FromUri]Agrupacion grupo)
        {
            if (grupo != null)
            {
                IBLAgrupacion IBLAgru = new BLAgrupacion();
                IBLAgru.deleteAgrupacion(grupo);
                return Ok();
            }
            return BadRequest();
        }
    }
}
