import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Http, HttpModule, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

declare var ol: any;
declare var $: any;

@Component({
    selector: 'cerebro-backoffice-inicio',
    templateUrl: 'inicio.component.html',
    styleUrls: ['inicio.component.css'],
    moduleId: module.id,
    providers: [LoginService]
})
export class InicioComponent implements OnInit {

    nombre_municipalidad: any = "";
    dispositivo = false;
    evento = false;
    tipo = false;
    usuario = false;
    autenticado: any;
    login = true;
    inicio = false;
    accion = false;
    registrarMunicipalidad = false;
    dominio = false;
    municipalidades: any;

    source: any;
    map: any;
    draw: any;
    vector: any;
    geom = "";
    mapDiv: any;

    nomMuni = "";
    nomAdmin = "";
    emailAdmin = "";
    passAdmin = "";

    email = "";
    pass = "";

    showDispositivo() {
        this.dispositivo = true;
        this.evento = false;
        this.tipo = false;
        this.usuario = false;
        this.accion = false;
    }

    showEvento() {
        this.dispositivo = false;
        this.evento = true;
        this.tipo = false;
        this.usuario = false;
        this.accion = false;
    }

    showTipo() {
        this.dispositivo = false;
        this.evento = false;
        this.tipo = true;
        this.usuario = false;
        this.accion = false;
    }

    showCrearMunicipalidad() {
        this.registrarMunicipalidad = true;
        this.login = false;
        this.dominio = false;
        setTimeout(() => this.mapa(), 2000);
        this.mapa();
    }

    showUsuario() {
        this.dispositivo = false;
        this.evento = false;
        this.tipo = false;
        this.usuario = true;
        this.accion = false;
    }

    showAcciones() {
        this.dispositivo = false;
        this.evento = false;
        this.tipo = false;
        this.usuario = false;
        this.accion = true;
    }

    mostrarDimmerMunicipalidad() {
        document.getElementById('dimmerM').style.display = "block";
        document.getElementById('exitoM').style.display = "block";
        document.getElementById('errorL').style.display = "none";
    }
    ocultarDimmerMunicipalidad() {
        document.getElementById('dimmerM').style.display = "none";
        document.getElementById('exitoM').style.display = "none";
        document.getElementById('errorL').style.display = "none";
    }
    mostrarDimmerLogin() {
        document.getElementById('dimmerM').style.display = "block";
        document.getElementById('exitoM').style.display = "none";
        document.getElementById('errorL').style.display = "block";
    }
    ocultarDimmerLogin() {
        document.getElementById('dimmerM').style.display = "none";
        document.getElementById('exitoM').style.display = "none";
        document.getElementById('errorL').style.display = "none";
    }

    constructor(private http: Http, private loginService: LoginService) { }

    ngOnInit() {
        $(document).ready(function () {
            $('.ui.dropdown').dropdown();
        });

        var muniL = window.location.toString().split("/")[2].split(".")[1].split("");
        this.nombre_municipalidad = muniL[0].toUpperCase();
        for (var h = 1; h < muniL.length; h++) {
            this.nombre_municipalidad += muniL[h];
        }

        if (this.nombre_municipalidad === "Cerebro-backoffice" || this.nombre_municipalidad === "" || this.nombre_municipalidad === undefined) {
            this.loginService.getMunicipalidades().subscribe(
                (data: Response) => {
                    this.municipalidades = data;
                    //for (var m of JSON.parse(JSON.stringify())) {
                    //    var h3 = document.createElement("h3");
                    //    h3.className = "ui header text item link w3-text-silver w3-hover-text-cerebro-red w3-padding-16";
                    //    h3.innerHTML = m.nombre;
                    //    h3.addEventListener("click", function () {
                    //        window.location.href = "https://www." + m.nombre + ".cerebro-backOffce.com";
                    //    });
                    //    document.getElementById("listMunicipalidades").appendChild(h3);
                    //}
                },
                responseError => console.log(responseError),
                () => console.log("Municipalidades cargadas")
            );
            this.dominio = true;
            this.login = false;
            this.inicio = false;
        }

        var features = new ol.Collection();
        this.draw = new ol.interaction.Draw({
            source: this.source,
            features: features,
            type: "Polygon"
        });

        this.draw.on('drawend', function (evt: any) {
            this.geom = evt.feature.getGeometry().getCoordinates();
            var polygon = new ol.geom.Polygon(evt.feature.getGeometry().getCoordinates());
            var feature = new ol.Feature(polygon);
            var vectorSource = new ol.source.Vector();
            vectorSource.addFeature(feature);
            var vectorLayer = new ol.layer.Vector({
                source: vectorSource
            });
            this.map.addLayer(vectorLayer);
            this.map.removeInteraction(this.draw);
            //alert(evt.feature.getGeometry().getCoordinates());
        }, this);
    }

    ingresar() {
        this.loginService.loginAdmin(this.email, this.nombre_municipalidad, this.pass).subscribe(
            (data: Response) => {
                this.autenticado = data;
                if (this.autenticado === true) {
                    this.login = false;
                    this.inicio = true;
                } else {
                    this.mostrarDimmerLogin();
                }
            },
            responseError => console.log("Error: " + responseError),
            () => console.log(this.autenticado)
        );
    }

    addMuni() {
        if (this.nomMuni != "" && this.nomAdmin != "" && this.passAdmin != "" && this.emailAdmin != "") {
            this.loginService.addMuni(this.nomMuni, this.geom).subscribe(
                (data: Response) => {
                    this.loginService.addAdmin(this.nomMuni, this.emailAdmin, this.nomAdmin, this.passAdmin).subscribe(
                        (data: Response) => {
                            this.mostrarDimmerMunicipalidad();
                        },
                        responseError => console.log("Error: " + responseError),
                        () => console.log("Usuario creado")
                    );
                },
                responseError => console.log("Error: " + responseError),
                () => console.log("Municipalidad creada")
            );
        }
    }

    gotoMunicipalidad() {
        document.getElementById('dimmerM').style.display = "none";
        document.getElementById('exitoM').style.display = "none";
        document.getElementById('errorL').style.display = "none";
        this.registrarMunicipalidad = false;
        window.location.href = "https://www." + this.nomMuni + ".cerebro-backOffice.com";
    }

    mapa() {
        $('#map').html("");
        //alert("mapa");
        var raster = new ol.layer.Tile({ source: new ol.source.OSM() });
        this.source = new ol.source.Vector({ wrapX: false });
        this.vector = new ol.layer.Vector({ source: this.source });

        this.map = new ol.Map({
            layers: [raster, this.vector],
            target: 'map',
            view: new ol.View({
                projection: 'EPSG:4326',
                center: [-56.16466616190428, -34.89647351494282],
                zoom: 12
            })
        });

        this.map.addInteraction(this.draw);
    }
}
