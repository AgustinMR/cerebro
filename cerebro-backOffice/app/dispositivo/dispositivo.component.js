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
var core_1 = require("@angular/core");
var dispositivo_service_1 = require("./dispositivo.service");
require("rxjs/add/operator/toPromise");
var FuenteDeDatoComponent = (function () {
    function FuenteDeDatoComponent(dispositivos) {
        this.dispositivos = dispositivos;
        this.nombre_municipalidad = "";
        this.geom = "";
        this.geomMod = "";
        this.tipoDeFuneteDeDatoSelect = "";
        this.tipoDeFuneteDeDatoSelectMod = "";
        this.selectBorrar = "";
        this.ipNew = "";
        this.userAgentNew = "";
        this.ipMod = "";
        this.nombreMod = "";
        this.userAgentMod = "";
        this.tipoGuardar = "nuevo";
    }
    FuenteDeDatoComponent.prototype.ngOnInit = function () {
        $(document).ready(function () {
            $('.ui.sidebar').sidebar('attach events', '.toc.item');
            $('.ui.dropdown').dropdown();
        });
        var muniL = window.location.toString().split("/")[2].split(".")[1].split("");
        this.nombre_municipalidad = muniL[0].toUpperCase();
        for (var h = 1; h < muniL.length; h++) {
            this.nombre_municipalidad += muniL[h];
        }
        var raster = new ol.layer.Tile({ source: new ol.source.OSM() });
        this.source = new ol.source.Vector({ wrapX: false });
        var vector = new ol.layer.Vector({
            source: this.source,
            style: new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 7,
                    fill: new ol.style.Fill({
                        color: 'orange'
                    })
                })
            })
        });
        this.map = new ol.Map({
            layers: [raster, vector],
            target: 'map',
            view: new ol.View({
                projection: 'EPSG:4326',
                center: [-56.16466616190428, -34.89647351494282],
                zoom: 12
            })
        });
        var features = new ol.Collection();
        this.draw = new ol.interaction.Draw({
            source: this.source,
            features: features,
            type: "Point"
        });
        this.draw.on('drawend', function (evt) {
            this.geom = evt.feature.getGeometry().getCoordinates();
            this.geomMod = evt.feature.getGeometry().getCoordinates();
            this.map.removeInteraction(this.draw);
        }, this);
        this.cargarTipos();
    };
    FuenteDeDatoComponent.prototype.cargarTipos = function () {
        var _this = this;
        this.dispositivos.obtenerTipos(this.nombre_municipalidad).subscribe(function (data) {
            _this.tipoDeFuneteDeDato = data;
            _this.cargarDispositivos();
        }, function (responseError) { return console.log(responseError); }, function () { return console.log("Tipos de fuentes de datos cargadas"); });
    };
    FuenteDeDatoComponent.prototype.cargarDispositivos = function () {
        var _this = this;
        this.dispositivos.obtenerDis(this.nombre_municipalidad).subscribe(function (data) {
            _this.dispositivosMod = data;
            //this.getDispositivosList();
        }, function (responseError) { return console.log(responseError); }, function () { return console.log("Fuentes de datos cargadas"); });
    };
    FuenteDeDatoComponent.prototype.nuevoPunto = function () {
        if (this.tipoGuardar == "nuevo") {
            this.source.clear();
        }
        else if (this.tipoGuardar == "modificar") {
            if (this.geomMod != "") {
                this.source.clear();
                this.map.removeLayer(this.vectorLayerMod);
            }
        }
        this.map.addInteraction(this.draw);
    };
    FuenteDeDatoComponent.prototype.guardar = function () {
        var _this = this;
        if (this.tipoGuardar == "nuevo") {
            if (this.ipNew != "" && this.userAgentNew != "" && this.tipoDeFuneteDeDatoSelect != "" && this.nombreNew != "" && this.geom != "") {
                this.dispositivos.agregarFuente(this.ipNew, this.userAgentNew, this.tipoDeFuneteDeDatoSelect, this.geom, this.nombre_municipalidad, this.nombreNew).subscribe(function (data) {
                    _this.ipNew = "";
                    _this.userAgentNew = "";
                    _this.tipoDeFuneteDeDatoSelect = "";
                    _this.nombreNew = "";
                    _this.source.clear();
                    _this.cargarTipos();
                }, function (responseError) { return console.log(responseError); }, function () { return console.log("Tipos de fuentes de datos cargadas"); });
            }
        }
        else if (this.tipoGuardar == "modificar") {
            if (this.ipMod != "" && this.userAgentMod != "" && this.geomMod != "") {
                //console.log(this.tipoDeFuneteDeDatoSelectMod);
                this.dispositivos.modificarFuente(this.ipMod, this.userAgentMod, this.geomMod, this.tipoDeFuneteDeDatoSelectMod).subscribe(function (data) {
                    _this.nombreMod = "";
                    _this.ipMod = "";
                    _this.userAgentMod = "";
                    _this.geomMod = "";
                    _this.tipoDeFuneteDeDatoSelectMod = "";
                    _this.source.clear();
                    _this.map.removeInteraction(_this.modifyInteraction);
                    _this.map.removeInteraction(_this.selectInteraction);
                    _this.map.removeLayer(_this.vectorLayerMod);
                    _this.cargarDispositivos();
                }, function (responseError) { return console.log(responseError); }, function () { return console.log("Tipos de fuentes de datos cargadas"); });
            }
        }
    };
    FuenteDeDatoComponent.prototype.onChange = function (val) {
        for (var _i = 0, _a = this.dispositivosMod; _i < _a.length; _i++) {
            var dis = _a[_i];
            if (dis.Id == val) {
                this.nombreMod = dis.nombre;
                this.ipMod = dis.direccionIP;
                this.userAgentMod = dis.userAgent;
                if (this.geomMod != "") {
                    this.source.clear();
                    this.map.removeInteraction(this.modifyInteraction);
                    this.map.removeInteraction(this.selectInteraction);
                    this.map.removeLayer(this.vectorLayerMod);
                    this.geomMod = "";
                }
                this.point_feature = new ol.Feature({});
                var point_geom = new ol.geom.Point(dis.ubicacion);
                this.point_feature.setGeometry(point_geom);
                this.vectorLayerMod = new ol.layer.Vector({
                    source: new ol.source.Vector({
                        features: [this.point_feature]
                    }),
                    style: new ol.style.Style({
                        image: new ol.style.Circle({
                            radius: 7,
                            fill: new ol.style.Fill({
                                color: 'orange'
                            })
                        })
                    })
                });
                this.map.addLayer(this.vectorLayerMod);
                this.geomMod = dis.ubicacion;
            }
        }
    };
    FuenteDeDatoComponent.prototype.borrarMapa = function (comp) {
        this.map.removeInteraction(this.draw);
        //console.log(this.geomMod);
        if (this.geom != "") {
            this.source.clear();
            this.geom = "";
            this.geomMod = "";
        }
        else if (this.geomMod != "") {
            this.map.removeInteraction(this.modifyInteraction);
            this.map.removeInteraction(this.selectInteraction);
            this.map.removeLayer(this.vectorLayerMod);
            this.geomMod = "";
            this.geom = "";
        }
        this.tipoGuardar = comp;
        if (comp === "quitar") {
            document.getElementById("mapBtn").style.display = "none";
        }
        else {
            document.getElementById("mapBtn").style.display = "block";
        }
    };
    FuenteDeDatoComponent.prototype.deleteDis = function () {
        var _this = this;
        this.dispositivos.deleteDis(this.selectBorrar).subscribe(function (data) { _this.cargarTipos(); console.log(data); }, function (responseError) { console.log(responseError); }, function () { return console.log("Tipo de fuente de datos eliminado"); });
    };
    return FuenteDeDatoComponent;
}());
FuenteDeDatoComponent = __decorate([
    core_1.Component({
        selector: 'cerebro-dispositivo',
        templateUrl: 'dispositivo.component.html',
        styleUrls: ['dispositivo.component.css'],
        moduleId: module.id,
        providers: [dispositivo_service_1.FuenteDeDatoService]
    }),
    __metadata("design:paramtypes", [dispositivo_service_1.FuenteDeDatoService])
], FuenteDeDatoComponent);
exports.FuenteDeDatoComponent = FuenteDeDatoComponent;
//# sourceMappingURL=dispositivo.component.js.map