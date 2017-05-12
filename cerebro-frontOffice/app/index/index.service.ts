import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

//export class FuenteDeDato {

//    Id: string;
//    municipalidad: string;
//    ubicacion: string;
//    direccionIP: string;
//    tipo: string;

//    constructor() { }

//}

@Injectable()
export class IndexService {

    constructor(private http: Http) { }

}