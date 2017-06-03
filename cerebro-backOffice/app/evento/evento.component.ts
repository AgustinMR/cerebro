import { Component, OnInit } from '@angular/core';
import { EventoService } from './evento.service';
import { Http, HttpModule, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

declare var $: any;

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
    nombre_municipalidad: any = "Mdeo"
    dispositivos: any;

    constructor(private eventos: EventoService) {
    }

    ngOnInit(): void {
        $(document).ready(function () {
            $('.ui.sidebar').sidebar('attach events', '.toc.item');
            $('.ui.dropdown').dropdown();
        });
        this.cargarDispositivos();
    }

    cargarDispositivos() {
        this.eventos.obtenerDis(this.nombre_municipalidad).subscribe(
            (data: Response) => {
                this.dispositivos = data;
            },
            responseError => console.log(responseError),
            () => console.log("Fuentes de datos cargadas")
        );
    }

    addEvento() {
        this.eventos.addEvento("vientos fuertes", "Mdeo").subscribe(
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
    mostrarStep1() {
        document.getElementById("step1").style.display = "block";
        document.getElementById("step2").style.display = "none";
        document.getElementById("step3").style.display = "none";
        document.getElementById("s1").className = "active step";
        document.getElementById("s2").className = "link step";
        document.getElementById("s3").className = "link step";
        document.getElementById("stepMod1").style.display = "block";
        document.getElementById("stepMod2").style.display = "none";
        document.getElementById("stepMod3").style.display = "none";
        document.getElementById("sm1").className = "active step";
        document.getElementById("sm2").className = "link step";
        document.getElementById("sm3").className = "link step";
    }

    mostrarStep2() {
        document.getElementById("step1").style.display = "none";
        document.getElementById("step2").style.display = "block";
        document.getElementById("step3").style.display = "none";
        document.getElementById("s2").className = "active step";
        document.getElementById("s1").className = "link step";
        document.getElementById("s3").className = "link step";
        document.getElementById("stepMod1").style.display = "none";
        document.getElementById("stepMod2").style.display = "block";
        document.getElementById("stepMod3").style.display = "none";
        document.getElementById("sm1").className = "link step";
        document.getElementById("sm2").className = "active step";
        document.getElementById("sm3").className = "link step";
    }

    mostrarStep3() {
        document.getElementById("step1").style.display = "none";
        document.getElementById("step2").style.display = "none";
        document.getElementById("step3").style.display = "block";
        document.getElementById("s3").className = "active step";
        document.getElementById("s2").className = "link step";
        document.getElementById("s1").className = "link step";
        document.getElementById("stepMod1").style.display = "none";
        document.getElementById("stepMod2").style.display = "none";
        document.getElementById("stepMod3").style.display = "block";
        document.getElementById("sm1").className = "link step";
        document.getElementById("sm2").className = "link step";
        document.getElementById("sm3").className = "active step";
    }
}
