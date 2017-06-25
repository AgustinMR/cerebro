"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var login_service_1 = require("./login.service");
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var InicioComponent = (function () {
    function InicioComponent(http, loginService) {
        this.http = http;
        this.loginService = loginService;
        this.nombre_municipalidad = "";
        this.dispositivo = false;
        this.evento = false;
        this.tipo = false;
        this.usuario = false;
        this.login = true;
        this.inicio = false;
        this.accion = false;
        this.registrarMunicipalidad = false;
        this.dominio = false;
        this.geom = "";
        this.nomMuni = "";
        this.nomAdmin = "";
        this.emailAdmin = "";
        this.passAdmin = "";
        this.email = "";
        this.pass = "";
    }
    InicioComponent.prototype.showDispositivo = function () {
        this.dispositivo = true;
        this.evento = false;
        this.tipo = false;
        this.usuario = false;
        this.accion = false;
    };
    InicioComponent.prototype.showEvento = function () {
        this.dispositivo = false;
        this.evento = true;
        this.tipo = false;
        this.usuario = false;
        this.accion = false;
    };
    InicioComponent.prototype.showTipo = function () {
        this.dispositivo = false;
        this.evento = false;
        this.tipo = true;
        this.usuario = false;
        this.accion = false;
    };
    InicioComponent.prototype.showCrearMunicipalidad = function () {
        var _this = this;
        this.registrarMunicipalidad = true;
        this.login = false;
        this.dominio = false;
        setTimeout(function () { return _this.mapa(); }, 2000);
        this.mapa();
    };
    InicioComponent.prototype.showUsuario = function () {
        this.dispositivo = false;
        this.evento = false;
        this.tipo = false;
        this.usuario = true;
        this.accion = false;
    };
    InicioComponent.prototype.showAcciones = function () {
        this.dispositivo = false;
        this.evento = false;
        this.tipo = false;
        this.usuario = false;
        this.accion = true;
    };
    InicioComponent.prototype.mostrarDimmerMunicipalidad = function () {
        document.getElementById('dimmerM').style.display = "block";
        document.getElementById('exitoM').style.display = "block";
        document.getElementById('errorL').style.display = "none";
    };
    InicioComponent.prototype.ocultarDimmerMunicipalidad = function () {
        document.getElementById('dimmerM').style.display = "none";
        document.getElementById('exitoM').style.display = "none";
        document.getElementById('errorL').style.display = "none";
    };
    InicioComponent.prototype.mostrarDimmerLogin = function () {
        document.getElementById('dimmerM').style.display = "block";
        document.getElementById('exitoM').style.display = "none";
        document.getElementById('errorL').style.display = "block";
    };
    InicioComponent.prototype.ocultarDimmerLogin = function () {
        document.getElementById('dimmerM').style.display = "none";
        document.getElementById('exitoM').style.display = "none";
        document.getElementById('errorL').style.display = "none";
    };
    InicioComponent.prototype.ngOnInit = function () {
        var _this = this;
        $(document).ready(function () {
            $('.ui.dropdown').dropdown();
        });
        var muniL = window.location.toString().split("/")[2].split(".")[1].split("");
        this.nombre_municipalidad = muniL[0].toUpperCase();
        for (var h = 1; h < muniL.length; h++) {
            this.nombre_municipalidad += muniL[h];
        }
        if (this.nombre_municipalidad === "Cerebro-backoffice" || this.nombre_municipalidad === "" || this.nombre_municipalidad === undefined) {
            this.loginService.getMunicipalidades().subscribe(function (data) {
                _this.municipalidades = data;
                //for (var m of JSON.parse(JSON.stringify())) {
                //    var h3 = document.createElement("h3");
                //    h3.className = "ui header text item link w3-text-silver w3-hover-text-cerebro-red w3-padding-16";
                //    h3.innerHTML = m.nombre;
                //    h3.addEventListener("click", function () {
                //        window.location.href = "https://www." + m.nombre + ".cerebro-backOffce.com";
                //    });
                //    document.getElementById("listMunicipalidades").appendChild(h3);
                //}
            }, function (responseError) { return console.log(responseError); }, function () { return console.log("Municipalidades cargadas"); });
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
        this.draw.on('drawend', function (evt) {
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
    };
    InicioComponent.prototype.ingresar = function () {
        var _this = this;
        this.loginService.loginAdmin(this.email, this.nombre_municipalidad, this.pass).subscribe(function (data) {
            _this.autenticado = data;
            if (_this.autenticado === true) {
                _this.login = false;
                _this.inicio = true;
            }
            else {
                _this.mostrarDimmerLogin();
            }
        }, function (responseError) { return console.log("Error: " + responseError); }, function () { return console.log(_this.autenticado); });
    };
    InicioComponent.prototype.addMuni = function () {
        var _this = this;
        if (this.nomMuni != "" && this.nomAdmin != "" && this.passAdmin != "" && this.emailAdmin != "") {
            this.loginService.addMuni(this.nomMuni, this.geom).subscribe(function (data) {
                _this.loginService.addAdmin(_this.nomMuni, _this.emailAdmin, _this.nomAdmin, _this.passAdmin).subscribe(function (data) {
                    _this.mostrarDimmerMunicipalidad();
                    _this.registrarMunicipalidad = false;
                    _this.login = true;
                }, function (responseError) { return console.log("Error: " + responseError); }, function () { return console.log("Usuario creado"); });
            }, function (responseError) { return console.log("Error: " + responseError); }, function () { return console.log("Municipalidad creada"); });
        }
    };
    InicioComponent.prototype.mapa = function () {
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
    };
    return InicioComponent;
}());
InicioComponent = __decorate([
    core_1.Component({
        selector: 'cerebro-backoffice-inicio',
        templateUrl: 'inicio.component.html',
        styleUrls: ['inicio.component.css'],
        moduleId: module.id,
        providers: [login_service_1.LoginService]
    }),
    __metadata("design:paramtypes", [http_1.Http, login_service_1.LoginService])
], InicioComponent);
exports.InicioComponent = InicioComponent;
//# sourceMappingURL=inicio.component.js.map