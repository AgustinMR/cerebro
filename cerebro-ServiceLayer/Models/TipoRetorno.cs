namespace cerebro_ServiceLayer.Models
{
    public enum TipoRetorno
    {
        ERROR,
        ERROR_USUARIO_EXISTENTE,
        ERROR_DATOS_NULL,
        ERROR_EMAIL_UTILIZADO,
        OK,
        OK_VISITANTE,
        OK_OPERADOR,
        OK_ADMINISTRADOR
    }
}