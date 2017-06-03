import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class EventoService {

    constructor(private http: Http) { }

    public addEvento(nombre_evento: string, nombre_municipalidad: string) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        var postInfo = "municipalidad=" + nombre_municipalidad + "&nombre=" + nombre_evento;
        return this.http.post("https://www.cerebro-serviceLayer.com/api/eventos/addEvento?" + postInfo, {}, options).map(data => data.json());
    }

    public addUmbral(nombre_evento: string, nombre_municipalidad: string, IdFuenteDeDato: string, valor: string) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        var postInfo = "nombreEvento=" + nombre_evento + "&nombreMunicipalidadEvento=" + nombre_municipalidad + "&IdFuenteDeDato=" + IdFuenteDeDato + "&valorLimite=" + valor;
        return this.http.post("https://www.cerebro-serviceLayer.com/api/eventos/addUmbral?" + postInfo, {}, options).map(data => data.json());
    }

    public obtenerDis(muni: string) {
        return this.http.get("https://www.cerebro-serviceLayer.com/api/dispositivos/muni/" + muni).map(data => data.json());
    }

}
