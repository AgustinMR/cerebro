import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AgrupacionService {

    constructor(private http: Http) { }

    public CrearAgrupacion(Nombre: string, Municipalidad: string, Admin: string) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post("http://localhost:58326/api/agrupaciones/nueva?" + "nombre_agrupacion=" + Nombre + "&nombre_municipalidad_agrupacion=" + Municipalidad + "&nombre_municipalidad_usuario=" + Municipalidad + "&usuario_email" + Admin + "&admin=true", {}, options).map(response => { });
    }

    public ModificarAgrupacion(Nombre: string, Admin: string) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post("http://localhost:58326/api/agrupaciones/nueva?" + "nombre_agrupacion=" + Nombre + "&usuario_email=" + Admin, {}, options).map(response => { });
    }

    public EliminarAgrupacion(Nombre: string) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post("http://localhost:58326/api/agrupaciones/nueva?" + "nombre_agrupacion=" + Nombre + "&", {}, options).map(response => { });
    }
}