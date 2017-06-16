import { Component } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Http, HttpModule, Response } from '@angular/http';
import { FuenteDeDatoService } from './dispositivo/dispositivo.service'
import { EventoService } from './evento/evento.service'
import { TipoDeFuenteDeDatoService } from './tipo/tipo.service'
import { UsuarioService } from './usuario/usuario.service'
import { LoginService } from './inicio/login.service'

@Component({
    selector: 'tsi1-cerebro-gr17',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css'],
    moduleId: module.id,
    providers: [FuenteDeDatoService, EventoService, TipoDeFuenteDeDatoService, UsuarioService, LoginService]
})
export class AppComponent {

    constructor(private http: Http) { }

    ngOnInit() {
    }

}
