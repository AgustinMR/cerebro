import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AgrupacionService {

    constructor(private http: Http) { }

    public addAgrupacion(email: string, municipalidad: string, agrupacion: string) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        var postInfo = "nombre_agrupacion=" + agrupacion + "&nombre_municipalidad_agrupacion=" + municipalidad + "&usuario_email=" + email + "&nombre_municipalidad_usuario=" + municipalidad + "&admin=true";
        return this.http.post("https://www.cerebro-serviceLayer.com/api/agrupaciones?" + postInfo, {}, options).map(data => data.json());
    }

    public deleteAgrupacion(nombre: string, municipalidad: string) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        var deleteInfo = "nombre=" + nombre + "&nombre_municipalidad=" + municipalidad;
        return this.http.delete("https://www.cerebro-serviceLayer.com/api/agrupaciones?" + deleteInfo, options).map(data => data.json());
    }

    public getAgrupacion(nombre: string, municipalidad: string) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        var deleteInfo = "nombre=" + nombre + "&nombre_municipalidad=" + municipalidad;
        return this.http.get("https://www.cerebro-serviceLayer.com/api/agrupaciones?" + deleteInfo, options).map(data => data.json());
    }

    public addUsuarioAgrupacion(email: string, municipalidad: string, agrupacion: string) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        var postInfo = "nombre_agrupacion=" + agrupacion + "&nombre_municipalidad_agrupacion=" + municipalidad + "&usuario_email=" + email + "&nombre_municipalidad_usuario=" + municipalidad + "&admin=true";
        return this.http.post("https://www.cerebro-serviceLayer.com/api/agrupaciones/usuario?" + postInfo, {}, options).map(data => data.json());
    }

    public toggleAdminAgrupacion(email: string, municipalidad: string, agrupacion: string, esAdmin: boolean) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        var postInfo = "nombre_agrupacion=" + agrupacion + "&nombre_municipalidad_agrupacion=" + municipalidad + "&usuario_email=" + email + "&nombre_municipalidad_usuario=" + municipalidad + "&admin=" + esAdmin;
        return this.http.put("https://www.cerebro-serviceLayer.com/api/agrupaciones/usuario?" + postInfo, {}, options).map(data => data.json());
    }

    public deleteUsuarioAgrupacion(email: string, municipalidad: string, agrupacion: string, esAdmin: boolean) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        var postInfo = "nombre_agrupacion=" + agrupacion + "&nombre_municipalidad_agrupacion=" + municipalidad + "&usuario_email=" + email + "&nombre_municipalidad_usuario=" + municipalidad + "&admin=" + esAdmin;
        return this.http.delete("https://www.cerebro-serviceLayer.com/api/agrupaciones/usuario?" + postInfo, options).map(data => data.json());
    }

    public getAgrupacionesByUsuario(email: string) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.get("https://www.cerebro-serviceLayer.com/api/agrupaciones/byUsuario?usuario_email=" + email, options).map(data => data.json());
    }

    public getUsuariosAgrupacion(nombre: string) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.get("https://www.cerebro-serviceLayer.com/api/agrupaciones/" + nombre, options).map(data => data.json());
    }

}