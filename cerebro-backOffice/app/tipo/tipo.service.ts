import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

//export class TipoDeFuenteDeDato {

//    Id: string;
//    nombre: string;
//    municipalidad: string;
//    frecuenciaLectura: string;
//    uriWebService: string;
//    tipo: TipoDeDato;

//    constructor() { }
//}

//export enum TipoDeDato {
//    TEXTO,
//    NUMERICO,
//    IMAGEN,
//    VIDEO
//}

@Injectable()
export class TipoDeFuenteDeDatoService {

    constructor(private http: Http) { }

    nombre_municipalidad : any = "Medo"

    public agregarTipo(nombre: string, tipoDeDato: string, endpointWS: string, frecLectura: string) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        var postInfo = "nombre=" + nombre + "&municipalidad=" + this.nombre_municipalidad + "&frecuenciaLectura=" + frecLectura + "&tipo=" + tipoDeDato + "&uriWebService=" + endpointWS;
        return this.http.post("http://localhost:58326/api/tipos?" + postInfo, {}, options).map(data => data.json());
    }

    public modificarTipo(nombre: string, tipoDeDato: string, endpointWS: string, frecLectura: string) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        var postInfo = "nombre=" + nombre + "&municipalidad=" + this.nombre_municipalidad + "&frecuenciaLectura=" + frecLectura + "&tipo=" + tipoDeDato + "&uriWebService=" + endpointWS;
        return this.http.put("http://localhost:58326/api/tipos?" + postInfo, {}, options).map(data => data.json());
    }

    public obtenerTipos() {
        return this.http.get("http://localhost:58326/api/tipos").map(data => data.json());
    }
}
