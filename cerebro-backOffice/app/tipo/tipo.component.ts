import { Component, OnInit } from '@angular/core';
import { TipoDeFuenteDeDatoService } from './tipo.service';
import { Http, HttpModule, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

declare var $: any;

@Component({
    selector: 'cerebro-tipo-de-fuente-de-dato',
    templateUrl: 'tipo.component.html',
    styleUrls: ['tipo.component.css'],
    moduleId: module.id,
    providers: [TipoDeFuenteDeDatoService]
})
export class TipoDeFuenteDeDatoComponent implements OnInit {

    constructor(private tipos: TipoDeFuenteDeDatoService) {
    }

    repuesta: any;
    nombre_municipalidad: any = "Mdeo"
    tipoSeleccionado = "";
    tipoMod: any;

    ngOnInit(): void {
        $(document).ready(function () {
            $('.ui.sidebar').sidebar('attach events', '.toc.item');
            $('.ui.dropdown').dropdown();
        });
        this.getTipos();
    }

    nombre = "";
    tipoDeDato = "";
    endpointWS = "";
    frecLectura = "";

    agregarTipoDeFuenteDeDato() {
        this.mostrarMensajeLoading();
        this.tipos.agregarTipo(this.nombre, this.tipoDeDato, this.endpointWS, this.frecLectura, this.nombre_municipalidad).subscribe(
            (data: Response) => { this.repuesta = data; this.mostrarMensajeExito(); },
            responseError => { console.log("Error: " + responseError); this.mostrarMensajeError(); },
            () => console.log(this.repuesta)
        );
        this.nombre = "";
        this.tipoDeDato = "";
        this.endpointWS = "";
        this.frecLectura = "";
        this.getTipos();
    }

    nombreMod = "";
    tipoDeDatoMod = "";
    endpointWSMod = "";
    frecLecturaMod = "";

    modificarTipoDeFuenteDeDato() {
        if (this.nombreMod != "") {
            this.tipos.modificarTipo(this.nombreMod, this.tipoDeDatoMod, this.endpointWSMod, this.frecLecturaMod, this.nombre_municipalidad).subscribe(
                (data: Response) => { this.repuesta = data; this.mostrarMensajeTipoModificado(); },
                responseError => { console.log("Error: " + responseError); this.mostrarMensajeError(); },
                () => console.log(this.repuesta)
            );
            this.nombreMod = "";
            this.tipoDeDatoMod = "";
            this.endpointWSMod = "";
            this.frecLecturaMod = "";
        } else {
            console.log("datos incorrectos");
        }

    }

    getTipos() {
        this.tipos.obtenerTipos(this.nombre_municipalidad).subscribe(
            (data: Response) => {
                this.tipoMod = data;
            },
            responseError => console.log(responseError),
            () => console.log("Tipos de fuentes de datos cargadas")
        );
    }

    onChange(deviceValue: any) {
        if (deviceValue != 0) {
            for (var i = 0; i < this.tipoMod.length; i++) {
                if (this.tipoMod[i].Id == deviceValue) {
                    this.endpointWSMod = this.tipoMod[i].uriWebService;
                    this.frecLecturaMod = this.tipoMod[i].frecuenciaLectura;
                    this.nombreMod = this.tipoMod[i].nombre;
                    this.tipoSeleccionado = this.tipoMod[i].Id;
                }
            }
        } else {
            this.nombreMod = "";
            this.tipoDeDatoMod = "";
            this.endpointWSMod = "";
            this.frecLecturaMod = "";
        }
    }

    deleteTipo() {
        //alert(this.tipoSeleccionado);
        if (this.tipoSeleccionado !== "") {
            this.mostrarMensajeLoading();
            this.tipos.deleteTipo(this.tipoSeleccionado).subscribe(
                (data: Response) => { this.mostrarMensajeTipoQuitado(); this.getTipos(); console.log(data); },
                responseError => { console.log(responseError); this.mostrarMensajeError(); },
                () => console.log("Tipo de fuente de datos eliminado")
            );
        }
    }

    mostrarMensajeExito() {
        document.getElementById("message").style.display = "block";
        document.getElementById("loading").style.display = "none";
        document.getElementById("success").style.display = "block";
        document.getElementById("error").style.display = "none";
        document.getElementById("confirmation").style.display = "none";
        document.getElementById("tipoEliminado").style.display = "none";
        document.getElementById("tipoModificado").style.display = "none";
    }

    mostrarMensajeError() {
        document.getElementById("message").style.display = "block";
        document.getElementById("loading").style.display = "none";
        document.getElementById("success").style.display = "none";
        document.getElementById("error").style.display = "block";
        document.getElementById("confirmation").style.display = "none";
        document.getElementById("tipoEliminado").style.display = "none";
        document.getElementById("tipoModificado").style.display = "none";
    }

    mostrarMensajeLoading() {
        document.getElementById("message").style.display = "block";
        document.getElementById("loading").style.display = "block";
        document.getElementById("success").style.display = "none";
        document.getElementById("error").style.display = "none";
        document.getElementById("confirmation").style.display = "none";
        document.getElementById("tipoEliminado").style.display = "none";
        document.getElementById("tipoModificado").style.display = "none";
    }

    mostrarMensajeConfirmacion() {
        document.getElementById("message").style.display = "block";
        document.getElementById("loading").style.display = "none";
        document.getElementById("success").style.display = "none";
        document.getElementById("error").style.display = "none";
        document.getElementById("confirmation").style.display = "block";
        document.getElementById("tipoEliminado").style.display = "none";
        document.getElementById("tipoModificado").style.display = "none";
    }

    mostrarMensajeTipoQuitado() {
        document.getElementById("message").style.display = "block";
        document.getElementById("loading").style.display = "none";
        document.getElementById("success").style.display = "none";
        document.getElementById("error").style.display = "none";
        document.getElementById("confirmation").style.display = "none";
        document.getElementById("tipoEliminado").style.display = "block";
        document.getElementById("tipoModificado").style.display = "none";
    }

    mostrarMensajeTipoModificado() {
        document.getElementById("message").style.display = "block";
        document.getElementById("loading").style.display = "none";
        document.getElementById("success").style.display = "none";
        document.getElementById("error").style.display = "none";
        document.getElementById("confirmation").style.display = "none";
        document.getElementById("tipoEliminado").style.display = "none";
        document.getElementById("tipoModificado").style.display = "block";
    }

    ocultarMensajes() {
        document.getElementById("message").style.display = "none";
        document.getElementById("loading").style.display = "none";
        document.getElementById("success").style.display = "none";
        document.getElementById("error").style.display = "none";
        document.getElementById("confirmation").style.display = "none";
        document.getElementById("tipoEliminado").style.display = "none";
        document.getElementById("tipoModificado").style.display = "none";
    }

}
