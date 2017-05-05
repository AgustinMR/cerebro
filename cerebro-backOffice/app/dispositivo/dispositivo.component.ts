import { Component, OnInit } from '@angular/core';
import { FuenteDeDatoService } from './dispositivo.service';
import { Http, HttpModule, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'cerebro-dispositivo',
    templateUrl: 'dispositivo.component.html',
    styleUrls: ['dispositivo.component.css'],
    moduleId: module.id,
    providers: [FuenteDeDatoService]
})
export class FuenteDeDatoComponent implements OnInit {

    employees: any;

    constructor(private dispositivos: FuenteDeDatoService) {
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
