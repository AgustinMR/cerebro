import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { Http, HttpModule, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'cerebro-usuario',
    templateUrl: 'usuario.component.html',
    styleUrls: ['usuario.component.css'],
    moduleId: module.id,
    providers: [UsuarioService]
})
export class UsuarioComponent implements OnInit {

    employees: any;

    constructor(private usuarios: UsuarioService) {
    }
    
    ngOnInit(): void {
        //this.getEmployees();
    }
    /*
    getEmployees() {
        this.employeeService.getEmployees().subscribe(
            (data: Response) => this.employees = data,
            responseError => console.log(responseError),
            () => console.log("Employee Fetching operation completed")
        );
    }*/
}
