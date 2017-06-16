import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class EventoService {

    constructor(private http: Http) { }

    public addEvento(nombre_evento: string, nombre_municipalidad: string, accion: string) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        var postInfo = "municipalidad=" + nombre_municipalidad + "&nombre=" + nombre_evento + "&accion=" + accion;
        return this.http.post("https://www.cerebro-serviceLayer.com/api/eventos/addEvento?" + postInfo, {}, options).map(data => data.json());
    }

    public updateEvento(id: string, nombre_evento: string, accion: string) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        var postInfo = "id=" + id + "&nombre=" + nombre_evento + "&accion=" + accion;
        return this.http.put("https://www.cerebro-serviceLayer.com/api/eventos?" + postInfo, {}, options).map(data => data.json());
    }

    public deleteEve(id: string) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.delete("https://www.cerebro-serviceLayer.com/api/eventos/" + id, options).map(data => data.json());
    }

    public addUmbral(eventoId: string, fuenteDeDatoId: string, valorLimite: string) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        var postInfo = "eventoId=" + eventoId + "&fuenteDeDatoId=" + fuenteDeDatoId + "&valorLimite=" + valorLimite;
        return this.http.post("https://www.cerebro-serviceLayer.com/api/eventos/addUmbral?" + postInfo, {}, options).map(data => data.json());
    }

    public updateUmbral(id: string, idEve: string, idDis: string, valor: string) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        var postInfo = "id=" + id + "&idEve=" + idEve + "&idDis=" + idDis + "&valor=" + valor;
        return this.http.put("https://www.cerebro-serviceLayer.com/api/eventos/umbrales?" + postInfo, {}, options).map(data => data.json());
    }

    public deleteUmbral(id: string) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.delete("https://www.cerebro-serviceLayer.com/api/eventos/umbrales/" + id, options).map(data => data.json());
    }

    public obtenerDis(muni: string) {
        return this.http.get("https://www.cerebro-serviceLayer.com/api/dispositivos/muni/" + muni).map(data => data.json());
    }

    public obtenerTipos(muni: string) {
        return this.http.get("https://www.cerebro-serviceLayer.com/api/tipos/muni/" + muni).map(data => data.json());
    }

    public obtenerAcciones(muni: string) {
        return this.http.get("https://www.cerebro-serviceLayer.com/api/eventos/acciones/" + muni).map(data => data.json());
    }

    public obtenerEventos(muni: string) {
        return this.http.get("https://www.cerebro-serviceLayer.com/api/eventos/muni/" + muni).map(data => data.json());
    }

    public obtenerUmbrales(idEve: string) {
        return this.http.get("https://www.cerebro-serviceLayer.com/api/eventos/umbrales/" + idEve).map(data => data.json());
    }
}
