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
var usuario_service_1 = require("./usuario.service");
require("rxjs/add/operator/toPromise");
var UsuarioComponent = (function () {
    function UsuarioComponent(usuarios) {
        this.usuarios = usuarios;
        this.nombre_municipalidad = "";
        this.privilegioSelect = "";
        this.usuarioSelect = "";
        this.estadoActual = "";
    }
    UsuarioComponent.prototype.ngOnInit = function () {
        $(document).ready(function () {
            $('.ui.sidebar').sidebar('attach events', '.toc.item');
            $('.ui.dropdown').dropdown();
            $('.ui.checkbox').checkbox();
        });
        var muniL = window.location.toString().split("/")[2].split(".")[1].split("");
        this.nombre_municipalidad = muniL[0].toUpperCase();
        for (var h = 1; h < muniL.length; h++) {
            this.nombre_municipalidad += muniL[h];
        }
        this.cargarUsuarios();
    };
    UsuarioComponent.prototype.getUsuario = function (email) {
        for (var x = 0; x < this.usuariosMunicipalidad.length; x++) {
            if (this.usuariosMunicipalidad[x].email == email) {
                document.getElementById("nombreAct").innerHTML = this.usuariosMunicipalidad[x].nombre;
                document.getElementById("emailAct").innerHTML = this.usuariosMunicipalidad[x].email;
                if (this.usuariosMunicipalidad[x].enabled === true) {
                    $('estadoActual').checkbox('check');
                }
            }
        }
    };
    UsuarioComponent.prototype.cargarUsuarios = function () {
        var _this = this;
        this.usuarios.getUsuariosByMunicipalidad(this.nombre_municipalidad).subscribe(function (data) {
            _this.usuariosMunicipalidad = data;
            //console.log(this.nombre_municipalidad +" "+ this.usuariosMunicipalidad);
        }, function (responseError) { return console.log("Error al cargar usuarios - " + responseError); }, function () { return console.log("usuarios cargados"); });
    };
    return UsuarioComponent;
}());
UsuarioComponent = __decorate([
    core_1.Component({
        selector: 'cerebro-usuario',
        templateUrl: 'usuario.component.html',
        styleUrls: ['usuario.component.css'],
        moduleId: module.id,
        providers: [usuario_service_1.UsuarioService]
    }),
    __metadata("design:paramtypes", [usuario_service_1.UsuarioService])
], UsuarioComponent);
exports.UsuarioComponent = UsuarioComponent;
//# sourceMappingURL=usuario.component.js.map