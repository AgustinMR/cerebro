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
var AgrupacionService = (function () {
    function AgrupacionService(http) {
        this.http = http;
    }
    AgrupacionService.prototype.addAgrupacion = function (email_usu, nombre_muni_usu, nombre_agrupacion, nombre_muni_agrupacion, esadmin) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var postInfo = "nombre_agrupacion=" + nombre_agrupacion + "&nombre_municipalidad_agrupacion=" + nombre_muni_agrupacion + "&usuario_email=" + email_usu + "&nombre_municipalidad_usuario=" + nombre_muni_usu + "&admin=true";
        return this.http.post("http://localhost:58326/api/agrupaciones/nueva?" + postInfo, {}, options).map(function (data) { return data.json(); });
    };
    return AgrupacionService;
}());
AgrupacionService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], AgrupacionService);
exports.AgrupacionService = AgrupacionService;
//# sourceMappingURL=agrupacion.service.js.map