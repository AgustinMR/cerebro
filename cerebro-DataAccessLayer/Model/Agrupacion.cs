//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace cerebro_DataAccessLayer.Model
{
    using System;
    using System.Collections.Generic;
    
    public partial class Agrupacion
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Agrupacion()
        {
            this.AGRUPACIONES_USUARIOS = new HashSet<Agrupacion_Usuario>();
        }
    
        public string nombre { get; set; }
        public string nombre_municipalidad { get; set; }
    
        public virtual Municipalidad MUNICIPALIDADES { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Agrupacion_Usuario> AGRUPACIONES_USUARIOS { get; set; }
    }
}
