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
var accion_service_1 = require("./accion.service");
require("rxjs/add/operator/toPromise");
var AccionComponent = (function () {
    function AccionComponent(service) {
        this.service = service;
        this.nombre = "";
        this.nombreMod = "";
        this.nombre_municipalidad = "";
        this.accionSelect = "";
    }
    AccionComponent.prototype.ngOnInit = function () {
        $(document).ready(function () {
            $('.ui.sidebar').sidebar('attach events', '.toc.item');
            $('.ui.dropdown').dropdown();
        });
        var muniL = window.location.toString().split("/")[2].split(".")[1].split("");
        this.nombre_municipalidad = muniL[0].toUpperCase();
        for (var h = 1; h < muniL.length; h++) {
            this.nombre_municipalidad += muniL[h];
        }
        this.getAcciones();
    };
    AccionComponent.prototype.enviarDll = function () {
        var forms = document.getElementById("nuevo").getElementsByTagName('FORM');
        var _this = this;
        if (this.nombre != "" && forms[0][0].files.length != 0) {
            var form = new FormData($('form')[0]);
            form.append("nombre", this.nombre);
            form.append("muni", this.nombre_municipalidad);
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
            };
            $.ajax(settings).done(function (response) {
                document.getElementById("nombre").value = "";
                forms[0][0].value = "";
                _this.getAcciones();
                //alert("done");
            });
        }
        else {
            console.log("error");
        }
    };
    AccionComponent.prototype.getAcciones = function () {
        var _this = this;
        this.service.obtenerAcciones(this.nombre_municipalidad).subscribe(function (data) {
            _this.acciones = data;
        }, function (responseError) { return console.log(responseError); }, function () { });
    };
    AccionComponent.prototype.onChange = function (val) {
        for (var _i = 0, _a = this.acciones; _i < _a.length; _i++) {
            var a = _a[_i];
            if (a.Id == val) {
                this.nombreMod = a.nombre;
            }
        }
    };
    AccionComponent.prototype.delAcciones = function () {
        var _this = this;
        var forms = document.getElementById("modificar").getElementsByTagName('FORM');
        if (this.accionSelect != "") {
            var form = new FormData();
            form.append("id", this.accionSelect);
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://www.cerebro-frontoffice.com/api/dispositivos/dllDel",
                "method": "DELETE",
                "headers": {
                    "cache-control": "no-cache"
                },
                "processData": false,
                "contentType": false,
                "mimeType": "multipart/form-data",
                "data": form
            };
            $.ajax(settings).done(function (response) {
                document.getElementById("nombreMod").value = "";
                forms[0][0].value = "";
                _this.getAcciones();
            });
        }
    };
    AccionComponent.prototype.modAcciones = function () {
        var forms = document.getElementById("modificar").getElementsByTagName('FORM');
        if (this.nombreMod != "") {
            var _this = this;
            if (forms[0][0].files.length != 0) {
                var form = new FormData($('form')[1]);
                form.append("nombre", this.nombreMod);
                form.append("id", this.accionSelect);
                var settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": "https://www.cerebro-frontoffice.com/api/dispositivos/dll",
                    "method": "PUT",
                    "headers": {
                        "cache-control": "no-cache"
                    },
                    "processData": false,
                    "contentType": false,
                    "mimeType": "multipart/form-data",
                    "data": form
                };
                $.ajax(settings).done(function (response) {
                    document.getElementById("nombreMod").value = "";
                    forms[0][0].value = "";
                    _this.getAcciones();
                });
                this.getAcciones();
            }
            else {
                var form2 = new FormData();
                form2.append("nombre", this.nombreMod);
                form2.append("id", this.accionSelect);
                var settings2 = {
                    "async": true,
                    "crossDomain": true,
                    "url": "https://www.cerebro-frontoffice.com/api/dispositivos/dllMod",
                    "method": "PUT",
                    "headers": {
                        "cache-control": "no-cache"
                    },
                    "processData": false,
                    "contentType": false,
                    "mimeType": "multipart/form-data",
                    "data": form2
                };
                $.ajax(settings2).done(function (response) {
                    document.getElementById("nombreMod").value = "";
                    forms[0][0].value = "";
                    _this.getAcciones();
                });
                this.getAcciones();
            }
        }
    };
    return AccionComponent;
}());
AccionComponent = __decorate([
    core_1.Component({
        selector: 'cerebro-accion-evento',
        templateUrl: 'accion.component.html',
        styleUrls: ['accion.component.css'],
        moduleId: module.id,
        providers: [accion_service_1.AccionService]
    }),
    __metadata("design:paramtypes", [accion_service_1.AccionService])
], AccionComponent);
exports.AccionComponent = AccionComponent;
//# sourceMappingURL=accion.component.js.map