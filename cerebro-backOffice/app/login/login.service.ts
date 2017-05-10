import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class LoginService {

    constructor(private http: Http) { }

    cons: any

    public loginAdmin(email: string, nombre_municipalidad: string, password: string) {
        alert("!!!");
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        //var postInfo = "email=" + email + "&nombre_municipalidad=" + nombre_municipalidad + "&password=" + password;
        var postInfo = "email=admin&nombre_municipalidad=Mdeo&password=hola";
        //console.log(this.http.post("https://localhost:44332/api/usuarios/loginAdministrador?" + postInfo, {}, options).map(response => { }));//.map(res => res.json())
        //.subscribe(
        //(res) => this.usuarioLogeado(res),
        //(err) => console.log(err),
        //() => console.log("FIN"));
    }

    public getGET() {
        return this.http.get("http://localhost:58326/api/municipalidades").map(data => data.json());
    }

    public usuarioLogeado(data: any) {
        alert("asdas");
        console.log(data)
    }

}
