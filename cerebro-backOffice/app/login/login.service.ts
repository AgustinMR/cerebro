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
        return this.http.post("http://localhost:58326/api/usuarios/loginAdministrador?" + postInfo, {}, options).map(data => data.json());
    }

    public obtenerMunicipalidades() {
        return this.http.get("http://localhost:58326/api/municipalidades").map(data => data.json());
        //return this.http.get("https://localhost:44332/api/municipalidades").map(data => data.json());
    }
}
