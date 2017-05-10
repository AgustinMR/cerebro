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

    repuesta: any;

    constructor(private tipos: TipoDeFuenteDeDatoService) {
    }

    ngOnInit(): void {
        //this.getEmployees();
    }

    nombre = "";
    tipoDeDato = "";
    endpointWS = "";
    frecLectura = "";

    agregarTipoDeFuenteDeDato() {
        this.tipos.agregarTipo(this.nombre, this.tipoDeDato , this.endpointWS, this.frecLectura).subscribe(
            (data: Response) => this.repuesta = data,
            responseError => console.log("Error: " + responseError),
            () => console.log(this.repuesta)
        );
        this.nombre = "";
        this.tipoDeDato = "";
        this.endpointWS = "";
        this.frecLectura = "";
    }

    nombreMod = "";
    tipoDeDatoMod = "";
    endpointWSMod = "";
    frecLecturaMod = "";

    modificarTipoDeFuenteDeDato() {
        this.tipos.modificarTipo(this.nombreMod, this.tipoDeDatoMod, this.endpointWSMod, this.frecLecturaMod).subscribe(
            (data: Response) => this.repuesta = data,
            responseError => console.log("Error: " + responseError),
            () => console.log(this.repuesta)
        );
        this.nombreMod = "";
        this.tipoDeDatoMod = "";
        this.endpointWSMod = "";
        this.frecLecturaMod = "";
    }
}
