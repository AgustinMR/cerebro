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
//export class Evento {
//    Id: string;
//    municipalidad: string;
//    nombre: string;
//    constructor() { }
//}
var EventoService = (function () {
    function EventoService(http) {
        this.http = http;
    }
    EventoService.prototype.addEvento = function (nombre_evento, nombre_municipalidad) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var postInfo = "municipalidad=" + nombre_municipalidad + "&nombre=" + nombre_evento;
        return this.http.post("https://www.cerebro-serviceLayer.com/api/eventos/addEvento?" + postInfo, {}, options).map(function (data) { return data.json(); });
    };
    EventoService.prototype.addUmbral = function (nombre_evento, nombre_municipalidad, IdFuenteDeDato, valor) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var postInfo = "nombreEvento=" + nombre_evento + "&nombreMunicipalidadEvento=" + nombre_municipalidad + "&IdFuenteDeDato=" + IdFuenteDeDato + "&valorLimite=" + valor;
        return this.http.post("https://www.cerebro-serviceLayer.com/api/eventos/addUmbral?" + postInfo, {}, options).map(function (data) { return data.json(); });
    };
    return EventoService;
}());
EventoService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], EventoService);
exports.EventoService = EventoService;
//# sourceMappingURL=evento.service.js.map