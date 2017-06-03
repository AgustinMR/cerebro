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
        this.nombre_municipalidad = "Mdeo";
        this.geom = "";
        this.geomMod = "";
        this.disAeliminar = "";
        this.tipoDeFuneteDeDatoSelect = "";
        this.tipoDeFuneteDeDatoSelectMod = "";
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
        var raster = new ol.layer.Tile({ source: new ol.source.OSM() });
        this.source = new ol.source.Vector({ wrapX: false });
        var vector = new ol.layer.Vector({ source: this.source });
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
                }, function (responseError) { return console.log(responseError); }, function () { return console.log("Tipos de fuentes de datos cargadas"); });
            }
        }
        else if (this.tipoGuardar == "modificar") {
            if (this.ipMod != "" && this.userAgentMod != "" && this.geomMod != "") {
                //console.log(this.tipoDeFuneteDeDatoSelectMod);
                this.dispositivos.modificarFuente(this.ipMod, this.userAgentMod, this.geomMod, this.tipoDeFuneteDeDatoSelectMod).subscribe(function (data) {
                    _this.ipMod = "";
                    _this.userAgentMod = "";
                    _this.geomMod = "";
                    _this.tipoDeFuneteDeDatoSelectMod = "";
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
            document.getElementById("btnGuardar").style.display = "none";
            document.getElementById("map").style.display = "none";
        }
        else {
            document.getElementById("btnGuardar").style.display = "block";
            document.getElementById("map").style.display = "block";
        }
    };
    //getDispositivosList() {
    //    while (document.getElementById("dispositivosActuales").hasChildNodes()) {
    //        document.getElementById("dispositivosActuales").removeChild(document.getElementById("dispositivosActuales").lastChild);
    //    }
    //    var x = this.dispositivosMod;
    //    for (var i = 0; i < x.length; i++) {
    //        //var y = JSON.parse(JSON.stringify(this.tipoDeFuneteDeDato));
    //        var tipo;
    //        for (var j = 0; j < this.tipoDeFuneteDeDato.length; j++) {
    //            if (this.tipoDeFuneteDeDato[j].Id === x[i].tipo) {
    //                tipo = this.tipoDeFuneteDeDato[j].nombre;
    //            }
    //        }
    //        var tr = document.createElement("tr");
    //        var td = document.createElement("td");
    //        td.innerHTML = x[i].nombre;
    //        var td2 = document.createElement("td");
    //        td2.innerHTML = tipo;
    //        var td4 = document.createElement("td");
    //        td4.innerHTML = x[i].userAgent;
    //        var td5 = document.createElement("td");
    //        td5.innerHTML = x[i].direccionIP;
    //        var td3 = document.createElement("td");
    //        td3.className = "w3-center";
    //        var img = document.createElement("img");
    //        img.src = "../../Content/rubbish-bin.svg";
    //        img.style.height = "37px";
    //        img.className = "w3-button w3-hover-none";
    //        img.onclick = () => { this.disAeliminar = x[i].Id; this.mostrarMensajeConfirmacion(); };
    //        td3.appendChild(img);
    //        tr.appendChild(td);
    //        tr.appendChild(td2);
    //        tr.appendChild(td4);
    //        tr.appendChild(td5);
    //        tr.appendChild(td3);
    //        document.getElementById("dispositivosActuales").appendChild(tr);
    //    }
    //}
    FuenteDeDatoComponent.prototype.deleteDis = function () {
        var _this = this;
        this.mostrarMensajeLoading();
        this.dispositivos.deleteDis(this.disAeliminar).subscribe(function (data) { _this.mostrarMensajeDispositivoEliminado(); console.log(data); }, function (responseError) { _this.mostrarMensajeError(); console.log(responseError); }, function () { return console.log("Tipo de fuente de datos eliminado"); });
    };
    FuenteDeDatoComponent.prototype.mostrarMensajeExito = function () {
        document.getElementById("message").style.display = "block";
        document.getElementById("loading").style.display = "none";
        document.getElementById("success").style.display = "block";
        document.getElementById("error").style.display = "none";
        document.getElementById("dispositivoModificado").style.display = "none";
        document.getElementById("dispositivoElimiando").style.display = "none";
        document.getElementById("confirmation").style.display = "none";
    };
    FuenteDeDatoComponent.prototype.mostrarMensajeError = function () {
        document.getElementById("message").style.display = "block";
        document.getElementById("loading").style.display = "none";
        document.getElementById("success").style.display = "none";
        document.getElementById("error").style.display = "block";
        document.getElementById("confirmation").style.display = "none";
        document.getElementById("dispositivoModificado").style.display = "none";
        document.getElementById("dispositivoElimiando").style.display = "none";
    };
    FuenteDeDatoComponent.prototype.mostrarMensajeLoading = function () {
        document.getElementById("message").style.display = "block";
        document.getElementById("loading").style.display = "block";
        document.getElementById("success").style.display = "none";
        document.getElementById("error").style.display = "none";
        document.getElementById("dispositivoModificado").style.display = "none";
        document.getElementById("dispositivoElimiando").style.display = "none";
        document.getElementById("confirmation").style.display = "none";
    };
    FuenteDeDatoComponent.prototype.mostrarMensajeConfirmacion = function () {
        document.getElementById("message").style.display = "block";
        document.getElementById("loading").style.display = "none";
        document.getElementById("success").style.display = "none";
        document.getElementById("error").style.display = "none";
        document.getElementById("dispositivoModificado").style.display = "none";
        document.getElementById("dispositivoElimiando").style.display = "none";
        document.getElementById("confirmation").style.display = "block";
    };
    FuenteDeDatoComponent.prototype.mostrarMensajeDispositivoModificado = function () {
        document.getElementById("message").style.display = "block";
        document.getElementById("loading").style.display = "none";
        document.getElementById("success").style.display = "none";
        document.getElementById("error").style.display = "none";
        document.getElementById("dispositivoModificado").style.display = "block";
        document.getElementById("dispositivoElimiando").style.display = "none";
        document.getElementById("confirmation").style.display = "none";
    };
    FuenteDeDatoComponent.prototype.mostrarMensajeDispositivoEliminado = function () {
        document.getElementById("message").style.display = "block";
        document.getElementById("loading").style.display = "none";
        document.getElementById("success").style.display = "none";
        document.getElementById("error").style.display = "none";
        document.getElementById("dispositivoModificado").style.display = "none";
        document.getElementById("dispositivoElimiando").style.display = "block";
        document.getElementById("confirmation").style.display = "none";
    };
    FuenteDeDatoComponent.prototype.ocultarMensajes = function () {
        document.getElementById("message").style.display = "none";
        document.getElementById("loading").style.display = "none";
        document.getElementById("success").style.display = "none";
        document.getElementById("error").style.display = "none";
        document.getElementById("dispositivoModificado").style.display = "none";
        document.getElementById("dispositivoElimiando").style.display = "none";
        document.getElementById("confirmation").style.display = "none";
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