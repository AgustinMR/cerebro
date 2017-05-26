﻿import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UsuarioService {

    constructor(private http: Http) { }

    getUsuariosByMunicipalidad(municipalidad: string) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.get("https://www.cerebro-serviceLayer.com/api/usuarios/municipalidad/" + municipalidad, options).map(data => data.json());
    }

    getUsuarios() {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.get("https://www.cerebro-serviceLayer.com/api/usuarios/", options).map(data => data.json());
    }

    getUsuario(email: string) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.get("https://www.cerebro-serviceLayer.com/api/usuarios/" + email, options).map(data => data.json());
    }
}