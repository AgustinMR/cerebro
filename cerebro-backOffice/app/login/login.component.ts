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
    login = true;
    inicio = false;

    constructor(private loginService: LoginService, private router: Router) {
    }

    //ingresar() {
    //    this.loginService.loginAdmin("sda","asdasd","asdsad").subscribe(
    //        (data: Response) => this.autenticado = data,
    //        responseError => console.log("Error: " + responseError),
    //        () => console.log(this.autenticado)
    //    );
    //}

    ingresar() {
        this.loginService.loginAdmin("sda", "asdasd", "asdsad").subscribe(
            (data: Response) => {
                if (data) {
                    this.autenticado = data;
                    this.login = false;
                    this.inicio = true;
                }
            },
            responseError => console.log("Error: " + responseError),
            () => console.log(this.autenticado)
        );
    }

    ngOnInit(): void {
        //this.getEmployees();
    }

    //getEmployees() {
    //    this.employeeService.getEmployees().subscribe(
    //        (data: Response) => this.employees = data,
    //        responseError => console.log(responseError),
    //        () => console.log("Employee Fetching operation completed")
    //    );
    //}
}
