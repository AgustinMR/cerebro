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
//export class TipoDeFuenteDeDato {
//    Id: string;
//    nombre: string;
//    municipalidad: string;
//    frecuenciaLectura: string;
//    uriWebService: string;
//    tipo: TipoDeDato;
//    constructor() { }
//}
//export enum TipoDeDato {
//    TEXTO,
//    NUMERICO,
//    IMAGEN,
//    VIDEO
//}
var TipoDeFuenteDeDatoService = (function () {
    function TipoDeFuenteDeDatoService(http) {
        this.http = http;
        this.nombre_municipalidad = "Medo";
    }
    TipoDeFuenteDeDatoService.prototype.agregarTipo = function (nombre, tipoDeDato, endpointWS, frecLectura) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var postInfo = "nombre=" + nombre + "&municipalidad=" + this.nombre_municipalidad + "&frecuenciaLectura=" + frecLectura + "&tipo=" + tipoDeDato + "&uriWebService=" + endpointWS;
        return this.http.post("http://localhost:58326/api/tipos?" + postInfo, {}, options).map(function (data) { return data.json(); });
    };
    TipoDeFuenteDeDatoService.prototype.modificarTipo = function (nombre, tipoDeDato, endpointWS, frecLectura) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var postInfo = "nombre=" + nombre + "&municipalidad=" + this.nombre_municipalidad + "&frecuenciaLectura=" + frecLectura + "&tipo=" + tipoDeDato + "&uriWebService=" + endpointWS;
        return this.http.put("http://localhost:58326/api/tipos?" + postInfo, {}, options).map(function (data) { return data.json(); });
    };
    TipoDeFuenteDeDatoService.prototype.obtenerTipos = function () {
        return this.http.get("http://localhost:58326/api/tipos").map(function (data) { return data.json(); });
    };
    return TipoDeFuenteDeDatoService;
}());
TipoDeFuenteDeDatoService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], TipoDeFuenteDeDatoService);
exports.TipoDeFuenteDeDatoService = TipoDeFuenteDeDatoService;
//# sourceMappingURL=tipo.service.js.map