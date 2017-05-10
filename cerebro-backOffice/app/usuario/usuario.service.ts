import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

//export class Usuario {
    
//    email: string;
//    nombre_municipalidad: string;
//    nombre: string;

//    constructor() { }
//}

//export class Agrupacion {

//}

@Injectable()
export class UsuarioService {

    constructor(private http: Http) { }

}
