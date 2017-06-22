import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class LoginService {

    constructor(private http: Http) { }

    public loginAdmin(email: string, nombre_municipalidad: string, password: string) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        var postInfo = "email=" + email + "&nombre_municipalidad=" + nombre_municipalidad + "&password=" + password;
        return this.http.post("https://www.cerebro-serviceLayer.com/api/usuarios/loginAdministrador?" + postInfo, {}, options).map(data => data.json());
    }

    public addMuni(nombre: string, geom: string) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        var postInfo = "nombre=" + nombre + "&ubicacion=" + geom;
        return this.http.post("https://www.cerebro-servicelayer.com/api/municipalidades?" + postInfo, options).map(data => data.json());
    }

    public addAdmin(nombreMuni: string, email: string, nombre: string, pass: string) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        var postInfo = "email=" + email + "&nombre_municipalidad=" + nombreMuni + "&nombre=" + nombre + "&password=" + pass;
        return this.http.post("https://www.cerebro-serviceLayer.com/api/usuarios/administrador?" + postInfo, {}, options).map(data => data.json());
    }
}
