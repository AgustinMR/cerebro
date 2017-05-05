import { Component, OnInit } from '@angular/core';
import { TipoDeFuenteDeDatoService } from './tipo.service';
import { Http, HttpModule, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'cerebro-tipo-de-fuente-de-dato',
    templateUrl: 'tipo.component.html',
    styleUrls: ['tipo.component.css'],
    moduleId: module.id,
    providers: [TipoDeFuenteDeDatoService]
})
export class TipoDeFuenteDeDatoComponent implements OnInit {

    employees: any;

    constructor(private tipos: TipoDeFuenteDeDatoService) {
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
