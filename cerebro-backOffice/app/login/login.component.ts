import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
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

    employees: any;

    constructor(private loginService: LoginService) {
    }

    ingresar() {
        //this.loginService.loginAdmin("sda","asdasd","asdsad");
        this.loginService.getGET().subscribe(
            (data: Response) => this.employees = data,
            responseError => console.log("Error: " + responseError),
            () => console.log("ok")
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
