import { Component, OnInit } from '@angular/core';
import { AccionService } from './accion.service';
import { Http, HttpModule, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

declare var ol: any;
declare var $: any;

@Component({
    selector: 'cerebro-accion-evento',
    templateUrl: 'accion.component.html',
    styleUrls: ['accion.component.css'],
    moduleId: module.id,
    providers: [AccionService]
})
export class AccionComponent implements OnInit {

    ngOnInit() {
        $(document).ready(function () {
            $('.ui.sidebar').sidebar('attach events', '.toc.item');
            $('.ui.dropdown').dropdown();
        });
    }

    constructor(private service: AccionService) { }
}