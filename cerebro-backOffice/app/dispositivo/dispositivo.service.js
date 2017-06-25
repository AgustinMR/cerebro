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
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/toPromise");
var FuenteDeDatoService = (function () {
    function FuenteDeDatoService(http) {
        this.http = http;
    }
    FuenteDeDatoService.prototype.obtenerTipos = function (muni) {
        return this.http.get("https://www.cerebro-serviceLayer.com/api/tipos/muni/" + muni).map(function (data) { return data.json(); });
    };
    FuenteDeDatoService.prototype.agregarFuente = function (dirIp, userAgent, tipo, ubicacion, municipalidad, nombre, privilegios) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var postInfo = "municipalidad=" + municipalidad + "&ubicacion=" + ubicacion + "&userAgent=" + userAgent + "&direccionIP=" + dirIp + "&tipo=" + tipo + "&nombre=" + nombre + "&privilegios=" + privilegios;
        return this.http.post("https://www.cerebro-serviceLayer.com/api/dispositivos?" + postInfo, {}, options).map(function (data) { return data.json(); });
    };
    FuenteDeDatoService.prototype.modificarFuente = function (dirIp, userAgent, ubicacion, id, privilegios, nombre) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var postInfo = "ubicacion=" + ubicacion + "&userAgent=" + userAgent + "&direccionIP=" + dirIp + "&id=" + id + "&privilegios=" + privilegios + "&nombre=" + nombre;
        return this.http.put("https://www.cerebro-serviceLayer.com/api/dispositivos?" + postInfo, {}, options).map(function (data) { return data.json(); });
    };
    FuenteDeDatoService.prototype.obtenerDis = function (muni) {
        return this.http.get("https://www.cerebro-serviceLayer.com/api/dispositivos/muni/" + muni).map(function (data) { return data.json(); });
    };
    FuenteDeDatoService.prototype.deleteDis = function (id) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.delete("https://www.cerebro-serviceLayer.com/api/dispositivos/" + id, options).map(function (data) { return data.json(); });
    };
    FuenteDeDatoService.prototype.obtenerPrivilegios = function (muni) {
        return this.http.get("https://www.cerebro-servicelayer.com/api/usuarios/privilegios?muni=" + muni).map(function (data) { return data.json(); });
    };
    return FuenteDeDatoService;
}());
FuenteDeDatoService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], FuenteDeDatoService);
exports.FuenteDeDatoService = FuenteDeDatoService;
//# sourceMappingURL=dispositivo.service.js.map