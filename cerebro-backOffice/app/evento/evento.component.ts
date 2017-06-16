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
    nombre_municipalidad: any = "";
    dispositivos: any;
    acciones: any;
    nombre = "";
    nombreMod = "";
    accionSelect = "";
    accionSelectMod = "";
    tipos: any;
    eventosMod: any;
    eventoSelect = "";
    umbralesMod: any;

    constructor(private eventos: EventoService) {
    }

    ngOnInit(): void {
        $(document).ready(function () {
            $('.ui.sidebar').sidebar('attach events', '.toc.item');
            $('.ui.dropdown').dropdown();
        });

        var muniL = window.location.toString().split("/")[2].split(".")[1].split("");
        this.nombre_municipalidad = muniL[0].toUpperCase();
        for (var h = 1; h < muniL.length; h++) {
            this.nombre_municipalidad += muniL[h];
        }
        this.cargarDispositivos();

    }

    cargarDispositivos() {
        this.eventos.obtenerDis(this.nombre_municipalidad).subscribe(
            (data: Response) => {
                this.dispositivos = data;
                this.cargarAcciones();
                this.cargarTipos();
            },
            responseError => console.log(responseError),
            () => console.log("Fuentes de datos cargadas")
        );
    }

    cargarTipos() {
        this.eventos.obtenerTipos(this.nombre_municipalidad).subscribe(
            (data: Response) => {
                this.tipos = data;
            },
            responseError => console.log(responseError),
            () => console.log("Tipos de datos cargados")
        );
    }

    cargarEventos() {
        document.getElementById("dispositivosDiv").innerHTML = "";
        this.eventos.obtenerEventos(this.nombre_municipalidad).subscribe(
            (data: Response) => {
                this.eventosMod = data;
            },
            responseError => console.log(responseError),
            () => console.log("Eventos cargados")
        );
    }

    cargarAcciones() {
        this.eventos.obtenerAcciones(this.nombre_municipalidad).subscribe(
            (data: Response) => {
                this.acciones = data;
            },
            responseError => console.log(responseError),
            () => console.log("Acciones cargadas")
        );
    }

    addEvento() {
        var num = document.getElementById("dispositivosDiv").getElementsByTagName('SELECT').length;
        if (this.nombre != "" && this.accionSelect != "" && num > 0) {
            this.eventos.addEvento(this.nombre, this.nombre_municipalidad, this.accionSelect).subscribe(
                (data: Response) => this.eventoAgregado = data,
                responseError => console.log(responseError),
                () => {
                    for (var i = 0; i < num; i++) {
                        var idDis = (<HTMLInputElement>document.getElementById("dispositivosDiv").getElementsByTagName('SELECT')[i]).value;
                        var valLim = (<HTMLInputElement>document.getElementById("dispositivosDiv").getElementsByTagName('INPUT')[i]).value;

                        this.eventos.addUmbral(this.eventoAgregado, idDis, valLim).subscribe(
                            (data: Response) => { },
                            responseError => console.log(responseError),
                            () => { }
                        );
                    }
                    this.nombre = "";
                    document.getElementById("dispositivosDiv").innerHTML = "";
                }
            );
        }
    }

    onChange(val: any) {
        for (var e of this.eventosMod) {
            if (e.Id == val) {
                this.nombreMod = e.nombre;
                $('#accionesMod').dropdown('set selected', e.accion);
                $('#accionesMod').dropdown('refresh');

                this.eventos.obtenerUmbrales(e.Id).subscribe(
                    (data: Response) => {
                        this.umbralesMod = data;
                        document.getElementById("dispositivosDivMod").innerHTML = "";
                        for (var umb of this.umbralesMod) {
                            this.addDisEventoMod();
                            $('SELECT').eq(2).dropdown('set selected', umb.fuenteDeDatoId);
                            (<HTMLInputElement>document.getElementById("dispositivosDivMod").getElementsByTagName('INPUT')[0]).value = umb.valorLimite;
                            (<HTMLInputElement>document.getElementById("dispositivosDivMod").getElementsByTagName('DIV')[0]).value = umb.Id;
                        }
                    },
                    responseError => console.log(responseError),
                    () => { }
                );
            }
        }
    }

    borrarEve() {
        this.eventos.deleteEve(this.eventoSelect).subscribe(
            (data: Response) => {
                this.nombreMod = "";
                document.getElementById("dispositivosDivMod").innerHTML = "";
                this.cargarEventos();
            },
            responseError => console.log(responseError),
            () => console.log("Evento borrado")
        );
    }

    modificarEve() {
        var num = document.getElementById("dispositivosDivMod").getElementsByTagName('SELECT').length;
        this.eventos.updateEvento(this.eventoSelect, this.nombreMod, this.accionSelectMod).subscribe(
            (data: Response) => {
                this.cargarEventos();
            },
            responseError => console.log(responseError),
            () => {
                var umbralesTmp = this.umbralesMod;
                for (var i = 0; i < num; i++) {
                    var divVal = (<HTMLInputElement>document.getElementById("dispositivosDivMod").getElementsByTagName('DIV')[0])
                    var idDis = (<HTMLInputElement>document.getElementById("dispositivosDivMod").getElementsByTagName('SELECT')[0]).value;
                    var valLim = (<HTMLInputElement>document.getElementById("dispositivosDivMod").getElementsByTagName('INPUT')[0]).value;
                    if (divVal.value != null) {
                        for (var umb in this.umbralesMod) {
                            if (this.umbralesMod[umb].Id == divVal.value){
                                umbralesTmp.splice(umb, 1);
                            }
                        }
                        this.eventos.updateUmbral(divVal.value, this.eventoSelect, idDis, valLim).subscribe(
                            (data: Response) => { },
                            responseError => console.log(responseError),
                            () => { }
                        );
                    } else {
                        alert(this.eventoSelect + " " + idDis +" " +  valLim);
                        this.eventos.addUmbral(this.eventoSelect, idDis, valLim).subscribe(
                            (data: Response) => { },
                            responseError => console.log(responseError),
                            () => { }
                        );
                    }
                    document.getElementById("dispositivosDivMod").removeChild(divVal);
                }
                //falta borrar umbrales borrados
                for (var umbT of umbralesTmp) {
                    this.eventos.deleteUmbral(umbT.Id).subscribe(
                        (data: Response) => { },
                        responseError => console.log(responseError),
                        () => { }
                    );
                }
                this.nombre = "";
                document.getElementById("dispositivosDiv").innerHTML = "";
            }
        );
    }

    addDisEvento() {
        var num = document.getElementById("dispositivosDiv").getElementsByTagName('SELECT').length;

        var segments = document.createElement("div");
        segments.id = "mainDiv" + num;
        segments.className = "ui segment grey";
        var button = document.createElement("button");
        button.className = "circular inverted orange compact ui icon button w3-margin-bottom";
        button.addEventListener("click", function () {
            document.getElementById("dispositivosDiv").removeChild(segments);
        });
        var i1 = document.createElement("i");
        i1.className = "icon remove";
        var select = document.createElement("select");
        select.id = "select0";
        select.className = "ui fluid dropdown";
        var option0 = document.createElement("option");
        option0.value = "";
        option0.innerHTML = "Seleccione un dispositivo...";
        select.appendChild(option0);
        var tipo = "";
        for (var d of this.dispositivos) {
            var option = document.createElement("option");
            option.value = d.Id;
            for (var t of this.tipos) {
                if (d.tipo == t.Id) {

                    switch (t.tipo) {
                        case 0:
                            tipo = " (Texto)";
                            break;
                        case 1:
                            tipo = " (Numerico)";
                            break;
                        case 2:
                            tipo = " (Imagen)";
                            break;
                        case 3:
                            tipo = " (Video)";
                    }
                }
            }
            option.innerHTML = d.nombre + tipo;
            select.appendChild(option);
        }
        var segments2 = document.createElement("div");
        segments2.className = "ui labeled fluid input w3-margin-top";
        var segments4 = document.createElement("div");
        segments4.className = "ui label w3-text-cerebro-red";
        segments4.innerHTML = "Umbral:";
        var imp = document.createElement("input");
        imp.id = "nombre" + num;
        imp.placeholder = "Ingrese el valor máximo hasta el cuál se considera normal...";
        imp.type = "text";

        segments.appendChild(button);
        button.appendChild(i1);
        segments.appendChild(select);
        segments.appendChild(segments2);
        segments2.appendChild(segments4);
        segments2.appendChild(imp);
        document.getElementById("dispositivosDiv").insertBefore(segments, document.getElementById("dispositivosDiv").firstChild);
        $('.ui.dropdown').dropdown();
    }

    addDisEventoMod() {
        var num = document.getElementById("dispositivosDivMod").getElementsByTagName('SELECT').length;

        var segments = document.createElement("div");
        segments.id = "mainDiv" + num;
        segments.className = "ui segment grey";
        var button = document.createElement("button");
        button.className = "circular inverted orange compact ui icon button w3-margin-bottom";
        button.addEventListener("click", function () {
            document.getElementById("dispositivosDivMod").removeChild(segments);
        });
        var i1 = document.createElement("i");
        i1.className = "icon remove";
        var select = document.createElement("select");
        select.id = "select0";
        select.className = "ui fluid dropdown";
        var option0 = document.createElement("option");
        option0.value = "";
        option0.innerHTML = "Seleccione un dispositivo...";
        select.appendChild(option0);
        var tipo = "";
        for (var d of this.dispositivos) {
            var option = document.createElement("option");
            option.value = d.Id;
            for (var t of this.tipos) {
                if (d.tipo == t.Id) {

                    switch (t.tipo) {
                        case 0:
                            tipo = " (Texto)";
                            break;
                        case 1:
                            tipo = " (Numerico)";
                            break;
                        case 2:
                            tipo = " (Imagen)";
                            break;
                        case 3:
                            tipo = " (Video)";
                    }
                }
            }
            option.innerHTML = d.nombre + tipo;
            select.appendChild(option);
        }
        var segments2 = document.createElement("div");
        segments2.className = "ui labeled fluid input w3-margin-top";
        var segments4 = document.createElement("div");
        segments4.className = "ui label w3-text-cerebro-red";
        segments4.innerHTML = "Umbral:";
        var imp = document.createElement("input");
        imp.id = "nombre" + num;
        imp.placeholder = "Ingrese el valor máximo hasta el cuál se considera normal...";
        imp.type = "text";

        segments.appendChild(button);
        button.appendChild(i1);
        segments.appendChild(select);
        segments.appendChild(segments2);
        segments2.appendChild(segments4);
        segments2.appendChild(imp);
        document.getElementById("dispositivosDivMod").insertBefore(segments, document.getElementById("dispositivosDivMod").firstChild);
        $('.ui.dropdown').dropdown();
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
