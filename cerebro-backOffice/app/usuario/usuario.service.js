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
var UsuarioService = (function () {
    function UsuarioService(http) {
        this.http = http;
    }
    UsuarioService.prototype.getUsuariosByMunicipalidad = function (muni) {
        return this.http.get("https://www.cerebro-servicelayer.com/api/usuarios/municipalidad/" + muni).map(function (data) { return data.json(); });
    };
    UsuarioService.prototype.toggleEnabled = function (email, enabled) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var putInfo = "email=" + email + "&enabled=" + enabled;
        return this.http.put("https://www.cerebro-serviceLayer.com/api/usuarios/enabled", putInfo, options).map(function (data) { return data.json(); });
    };
    UsuarioService.prototype.modificarPrivilegios = function (email, privilegio) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var postInfo = "email=" + email + "&privilegio=" + privilegio;
        return this.http.put("https://www.cerebro-serviceLayer.com/api/usuarios/privilegio", postInfo, options).map(function (data) { return data.json(); });
    };
    return UsuarioService;
}());
UsuarioService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], UsuarioService);
exports.UsuarioService = UsuarioService;
//# sourceMappingURL=usuario.service.js.map