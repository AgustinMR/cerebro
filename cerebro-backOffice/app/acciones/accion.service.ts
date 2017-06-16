import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AccionService {

    constructor(private http: Http) { }

    public obtenerAcciones(muni: string) {
        return this.http.get("https://www.cerebro-serviceLayer.com/api/eventos/acciones/" + muni).map(data => data.json());
    }

    public deleteAccion(id: string) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.delete("https://www.cerebro-frontoffice.com/api/dispositivos/dllDel?id=" + id, options).map(data => data.json());
    }

}
