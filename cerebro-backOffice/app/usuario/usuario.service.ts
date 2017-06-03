import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UsuarioService {

    constructor(private http: Http) { }

    public getUsuariosByMunicipalidad(muni: string) {
        return this.http.get("https://www.cerebro-servicelayer.com/api/usuarios/municipalidad/" + muni).map(data => data.json());
    }

    public toggleEnabled(email: string, enabled: string) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        var putInfo = "email=" + email + "&enabled=" + enabled;
        return this.http.put("https://www.cerebro-serviceLayer.com/api/usuarios/enabled", putInfo, options).map(data => data.json());
    }

    public modificarPrivilegios(email: string, privilegio: string) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        var postInfo = "email=" + email + "&privilegio=" + privilegio;
        return this.http.put("https://www.cerebro-serviceLayer.com/api/usuarios/privilegio", postInfo, options).map(data => data.json());
    }

}
