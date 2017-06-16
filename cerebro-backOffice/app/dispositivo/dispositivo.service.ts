import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class FuenteDeDatoService {

    constructor(private http: Http) { }

    public obtenerTipos(muni: string) {
        return this.http.get("https://www.cerebro-serviceLayer.com/api/tipos/muni/" + muni).map(data => data.json());
    }

    public agregarFuente(dirIp: string, userAgent: string, tipo: string, ubicacion: string, municipalidad: string, nombre: string) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        var postInfo = "municipalidad=" + municipalidad + "&ubicacion=" + ubicacion + "&userAgent=" + userAgent + "&direccionIP=" + dirIp + "&tipo=" + tipo + "&nombre=" + nombre;
        return this.http.post("https://www.cerebro-serviceLayer.com/api/dispositivos?" + postInfo, {}, options).map(data => data.json());
    }

    public modificarFuente(dirIp: string, userAgent: string, ubicacion: string, id: string) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        var postInfo = "ubicacion=" + ubicacion + "&userAgent=" + userAgent + "&direccionIP=" + dirIp + "&id=" + id;
        return this.http.put("https://www.cerebro-serviceLayer.com/api/dispositivos?" + postInfo, {}, options).map(data => data.json());
    }

    public obtenerDis(muni: string) {
        return this.http.get("https://www.cerebro-serviceLayer.com/api/dispositivos/muni/" + muni).map(data => data.json());
    }
    
    public deleteDis(id: string) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.delete("https://www.cerebro-serviceLayer.com/api/dispositivos/" + id, options).map(data => data.json());
    }

}
