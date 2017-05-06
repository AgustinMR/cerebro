import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

export class Evento {

    Id: string;
    municipalidad: string;
    nombre: string;

    constructor() { }
}

@Injectable()
export class EventoService {

    constructor(private http: Http) { }

}
