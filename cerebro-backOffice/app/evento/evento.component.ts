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
    nombre_municipalidad: any = "";
    dispositivos: any;

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
            },
            responseError => console.log(responseError),
            () => console.log("Fuentes de datos cargadas")
        );
    }

    addEvento() {
        this.eventos.addEvento("vientos fuertes", this.nombre_municipalidad).subscribe(
            (data: Response) => this.eventoAgregado = data,
            responseError => console.log(responseError),
            () => {
                console.log(this.eventoAgregado);
                this.eventos.addUmbral("vientos fuertes", this.nombre_municipalidad, "59174a23277b658f30a00bc5", "120").subscribe(
                    (data: Response) => this.umbralAgregado = data,
                    responseError => console.log(responseError),
                    () => console.log("ok " + this.umbralAgregado)
                );
            }
        );
    }

    addDisEvento() {
        var num = document.getElementById("dispositivosDiv").getElementsByTagName('SELECT').length;
        //alert(num);

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
        for (var d of this.dispositivos) {
            var option = document.createElement("option");
            option.value = d.Id;
            option.innerHTML = d.nombre;
            select.appendChild(option);
        }
        var segments2 = document.createElement("div");
        segments2.className = "ui labeled fluid input w3-margin-top";
        var segments3 = document.createElement("div");
        segments3.className = "ui label w3-text-cerebro-red";
        segments3.innerHTML = "Tipo de datos que envia:";
        var lbl = document.createElement("label");
        lbl.innerHTML = "Texto";
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
        segments2.appendChild(segments3);
        segments2.appendChild(lbl);
        segments2.appendChild(segments4);
        segments2.appendChild(imp);
        document.getElementById("dispositivosDiv").insertBefore(segments, document.getElementById("dispositivosDiv").firstChild);
        $('.ui.dropdown').dropdown({
            onChange: function (val: any) {
                alert(val);
            }
        });
    }

    enviarImg() {
        var form = new FormData($('form')[0]);
        form.append("nombre", "hola");

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://www.cerebro-frontoffice.com/api/dispositivos/dll",
            "method": "POST",
            "headers": {
                "cache-control": "no-cache"
            },
            "processData": false,
            "contentType": false,
            "mimeType": "multipart/form-data",
            "data": form
        }

        $.ajax(settings).done(function (response: any) {
            console.log(response);
        });
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
