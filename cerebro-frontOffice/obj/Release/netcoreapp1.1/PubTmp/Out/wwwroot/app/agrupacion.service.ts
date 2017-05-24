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
        return this.http.post("https://www.cerebro-serviceLayer.com/api/agrupaciones?" + postInfo, {}, options).map(data => data.json());
    }

    public deleteAgrupacion(nombre: string, municipalidad: string) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        var postInfo = "nombre=" + nombre + "&nombre_municipalidad=" + municipalidad;
        return this.http.delete("https://www.cerebro-serviceLayer.com/api/agrupaciones?" + postInfo, options).map(data => data.json());
    }

    public addUsuario(email: string, agrupacion: string, municipalidad: string, esAdmin: boolean) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        var postInfo = "nombre_agrupacion=" + agrupacion + "&nombre_municipalidad_agrupacion=" + municipalidad + "&usuario_email=" + email + "&nombre_municipalidad_usuario=" + municipalidad + "&admin=" + esAdmin;
        return this.http.post("https://www.cerebro-serviceLayer.com/api/agrupaciones/usuario?" + postInfo, {}, options).map(data => data.json());
    }

    public toggleUsuarioAdmin(email: string, agrupacion: string, municipalidad: string, esAdmin: boolean) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        var postInfo = "nombre_agrupacion=" + agrupacion + "&nombre_municipalidad_agrupacion=" + municipalidad + "&usuario_email=" + email + "&nombre_municipalidad_usuario=" + municipalidad + "&admin=" + esAdmin;
        return this.http.put("https://www.cerebro-serviceLayer.com/api/agrupaciones/usuario?" + postInfo, {}, options).map(data => data.json());
    }

    public deleteUsuario(email: string, agrupacion: string, municipalidad: string, esAdmin: boolean) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        var postInfo = "nombre_agrupacion=" + agrupacion + "&nombre_municipalidad_agrupacion=" + municipalidad + "&usuario_email=" + email + "&nombre_municipalidad_usuario=" + municipalidad + "&admin=" + esAdmin;
        return this.http.delete("https://www.cerebro-serviceLayer.com/api/agrupaciones/usuario?" + postInfo, options).map(data => data.json());
    }

    public getAgrupacion(nombre: string, municipalidad: string) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        var postInfo = "nombre=" + nombre + "&nombre_municipalidad=" + municipalidad;
        return this.http.get("https://www.cerebro-serviceLayer.com/api/agrupaciones?" + postInfo, options).map(data => data.json());
    }

    public getUsuariosAgrupacion(nombre: string, municipalidad: string) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        var postInfo = "nombre=" + nombre + "&nombre_municipalidad=" + municipalidad;
        return this.http.get("https://www.cerebro-serviceLayer.com/api/agrupaciones/usuario?" + postInfo, options).map(data => data.json());
    }

}