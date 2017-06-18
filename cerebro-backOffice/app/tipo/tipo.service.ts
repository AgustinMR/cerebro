import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TipoDeFuenteDeDatoService {

    constructor(private http: Http) { }

    public agregarTipo(nombre: string, tipoDeDato: string, endpointWS: string, frecLectura: string, municipalidad: string) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        var postInfo = "nombre=" + nombre + "&municipalidad=" + municipalidad + "&frecuenciaLectura=" + frecLectura + "&tipo=" + tipoDeDato + "&uriWebService=" + endpointWS;
        return this.http.post("https://www.cerebro-serviceLayer.com/api/tipos?" + postInfo, {}, options).map(data => data.json());
    }

    public modificarTipo(nombre: string, endpointWS: string, frecLectura: string, id: string) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        var postInfo = "id=" + id + "&nombre=" + nombre + "&frecuenciaLectura=" + frecLectura +"&uriWebService=" + endpointWS;
        return this.http.put("https://www.cerebro-serviceLayer.com/api/tipos?" + postInfo, {}, options).map(data => data.json());
    }

    public obtenerTipos(muni: string) {
        return this.http.get("https://www.cerebro-serviceLayer.com/api/tipos/muni/" + muni).map(data => data.json());
    }

    public deleteTipo(id: string) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.delete("https://www.cerebro-serviceLayer.com/api/tipos/" + id, options).map(data => data.json());
    }
}
