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

    public toggleEnabled(email: string, muni: string, enabled: boolean) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        var putInfo = "email=" + email + "&muni=" + muni + "&enabled=" + enabled;
        return this.http.put("https://www.cerebro-serviceLayer.com/api/usuarios/enabled?" + putInfo, options).map(data => data.json());
    }

    public modificarPrivilegios(email: string, muni: string, privilegio: string) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        var postInfo = "email=" + email + "&muni=" + muni + "&privilegio=" + privilegio;
        return this.http.post("https://www.cerebro-serviceLayer.com/api/usuarios/privilegio?" + postInfo, options).map(data => data.json());
    }

    public eliminarPrivilegios(email: string, muni: string, privilegio: string) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        var postInfo = "email=" + email + "&muni=" + muni + "&privilegio=" + privilegio;
        return this.http.delete("https://www.cerebro-serviceLayer.com/api/usuarios/privilegio?" + postInfo, options).map(data => data.json());
    }

    public obtenerPrivilegios(muni: string) {
        return this.http.get("https://www.cerebro-servicelayer.com/api/usuarios/privilegios?muni=" + muni).map(data => data.json());
    }

    public obtenerPrivilegiosUsu(email: string, muni: string) {
        return this.http.get("https://www.cerebro-servicelayer.com/api/usuarios/privilegiosUsu?email=" + email + "&muni=" + muni).map(data => data.json());
    }

}
