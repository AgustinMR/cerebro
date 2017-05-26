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
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/toPromise");
var AgrupacionService = (function () {
    function AgrupacionService(http) {
        this.http = http;
    }
    AgrupacionService.prototype.addAgrupacion = function (email, municipalidad, agrupacion) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var postInfo = "nombre_agrupacion=" + agrupacion + "&nombre_municipalidad_agrupacion=" + municipalidad + "&usuario_email=" + email + "&nombre_municipalidad_usuario=" + municipalidad + "&admin=true";
        return this.http.post("https://www.cerebro-serviceLayer.com/api/agrupaciones?" + postInfo, {}, options).map(function (data) { return data.json(); });
    };
    AgrupacionService.prototype.deleteAgrupacion = function (nombre, municipalidad) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var deleteInfo = "nombre=" + nombre + "&nombre_municipalidad=" + municipalidad;
        return this.http.delete("https://www.cerebro-serviceLayer.com/api/agrupaciones?" + deleteInfo, options).map(function (data) { return data.json(); });
    };
    AgrupacionService.prototype.getAgrupacion = function (nombre, municipalidad) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var deleteInfo = "nombre=" + nombre + "&nombre_municipalidad=" + municipalidad;
        return this.http.get("https://www.cerebro-serviceLayer.com/api/agrupaciones?" + deleteInfo, options).map(function (data) { return data.json(); });
    };
    AgrupacionService.prototype.addUsuarioAgrupacion = function (email, municipalidad, agrupacion) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var postInfo = "nombre_agrupacion=" + agrupacion + "&nombre_municipalidad_agrupacion=" + municipalidad + "&usuario_email=" + email + "&nombre_municipalidad_usuario=" + municipalidad + "&admin=true";
        return this.http.post("https://www.cerebro-serviceLayer.com/api/agrupaciones/usuario?" + postInfo, {}, options).map(function (data) { return data.json(); });
    };
    AgrupacionService.prototype.toggleAdminAgrupacion = function (email, municipalidad, agrupacion, esAdmin) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var postInfo = "nombre_agrupacion=" + agrupacion + "&nombre_municipalidad_agrupacion=" + municipalidad + "&usuario_email=" + email + "&nombre_municipalidad_usuario=" + municipalidad + "&admin=" + esAdmin;
        return this.http.put("https://www.cerebro-serviceLayer.com/api/agrupaciones/usuario?" + postInfo, {}, options).map(function (data) { return data.json(); });
    };
    AgrupacionService.prototype.deleteUsuarioAgrupacion = function (email, municipalidad, agrupacion) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var postInfo = "nombre_agrupacion=" + agrupacion + "&nombre_municipalidad_agrupacion=" + municipalidad + "&usuario_email=" + email + "&nombre_municipalidad_usuario=" + municipalidad;
        return this.http.delete("https://www.cerebro-serviceLayer.com/api/agrupaciones/usuario?" + postInfo, options).map(function (data) { return data.json(); });
    };
    AgrupacionService.prototype.getAgrupacionesByUsuario = function (email) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.get("https://www.cerebro-serviceLayer.com/api/agrupaciones/byUsuario?usuario_email=" + email, options).map(function (data) { return data.json(); });
    };
    AgrupacionService.prototype.getUsuariosAgrupacion = function (nombre) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.get("https://www.cerebro-serviceLayer.com/api/agrupaciones/" + nombre, options).map(function (data) { return data.json(); });
    };
    return AgrupacionService;
}());
AgrupacionService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], AgrupacionService);
exports.AgrupacionService = AgrupacionService;
//# sourceMappingURL=agrupacion.service.js.map