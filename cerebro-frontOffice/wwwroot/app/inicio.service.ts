import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class InicioService {

    constructor(private http: Http) { }

    getDispositivos(muni: string) {
        return this.http.get("https://www.cerebro-serviceLayer.com/api/dispositivos/muni/" + muni).map(data => data.json());
    }
}