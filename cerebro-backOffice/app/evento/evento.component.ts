import { Component, OnInit } from '@angular/core';
import { EventoService } from './evento.service';
import { Http, HttpModule, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'cerebro-evento',
    templateUrl: 'evento.component.html',
    styleUrls: ['evento.component.css'],
    moduleId: module.id,
    providers: [EventoService]
})
export class EventoComponent implements OnInit {

    eventoAgregado: any;
    umbralAgregado: any;

    constructor(private eventos: EventoService) {
    }

    ngOnInit(): void {
        //this.getEmployees();
    }
    
    addEvento() {
        this.eventos.addEvento("vientos fuertes","Mdeo").subscribe(
            (data: Response) => this.eventoAgregado = data,
            responseError => console.log(responseError),
            () => {
                console.log(this.eventoAgregado);
                this.eventos.addUmbral("vientos fuertes", "Mdeo", "59174a23277b658f30a00bc5", "120").subscribe(
                    (data: Response) => this.umbralAgregado = data,
                    responseError => console.log(responseError),
                    () => console.log("ok " + this.umbralAgregado)
                );
            }
        );
    }
}
