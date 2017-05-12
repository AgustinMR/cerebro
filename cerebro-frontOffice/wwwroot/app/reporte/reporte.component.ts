import { Component, OnInit } from '@angular/core';
import { ReporteService } from './reporte.service';
import { Http, HttpModule, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'cerebro-reporte',
    templateUrl: 'reporte.component.html',
    styleUrls: ['reporte.component.css'],
    moduleId: module.id,
    providers: [ReporteService]
})
export class ReporteComponent implements OnInit {

    constructor(private reporteService: ReporteService) {
    }

    ngOnInit(): void {
        //this.getEmployees();
    }

}
