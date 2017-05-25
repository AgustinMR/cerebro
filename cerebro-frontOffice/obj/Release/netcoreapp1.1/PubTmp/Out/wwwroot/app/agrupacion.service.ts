import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AgrupacionService {

    constructor(private http: Http) { }

    public addAgrupacion(email_usu: string, nombre_muni_usu: string, nombre_agrupacion: string, nombre_muni_agrupacion: string, esadmin: boolean) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        var postInfo = "nombre_agrupacion=" + nombre_agrupacion + "&nombre_municipalidad_agrupacion=" + nombre_muni_agrupacion + "&usuario_email=" + email_usu + "&nombre_municipalidad_usuario=" + nombre_muni_usu + "&admin=true";
        return this.http.post("https://www.cerebro-serviceLayer.com/api/agrupaciones/nueva?" + postInfo, {}, options).map(data => data.json());
    }

    //public ModificarAgrupacion(Nombre: string, Admin: string) {
    //    let headers = new Headers({ 'Content-Type': 'application/json' });
    //    let options = new RequestOptions({ headers: headers });
    //    return this.http.post("https://www.cerebro-serviceLayer.com/api/agrupaciones/nueva?" + "nombre_agrupacion=" + Nombre + "&usuario_email=" + Admin, {}, options).map(response => { });
    //}

}