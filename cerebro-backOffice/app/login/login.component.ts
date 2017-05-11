import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http, HttpModule, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'cerebro-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css'],
    moduleId: module.id,
    providers: [LoginService]
})

export class LoginComponent implements OnInit {

    autenticado: any;
    municipalidades: any;
    login = true;
    inicio = false;
    selectedIndex: any;

    constructor(private loginService: LoginService, private router: Router) {
    }

    ingresar() {
        this.loginService.loginAdmin("admin", "Mdeo", "hola").subscribe(
            (data: Response) => {
                this.autenticado = data;
                if (this.autenticado == true) {
                    this.login = false;
                    this.inicio = true;
                }
            },
            responseError => console.log("Error: " + responseError),
            () => console.log(this.autenticado)
        );
    }

    ngOnInit(): void {
        this.getMunicipalidades();
    }

    getMunicipalidades() {
        this.loginService.obtenerMunicipalidades().subscribe(
            (data: Response) => this.municipalidades = data,
            responseError => console.log(responseError),
            () => console.log("Municipalidades cargadas")
        );
    }
}
