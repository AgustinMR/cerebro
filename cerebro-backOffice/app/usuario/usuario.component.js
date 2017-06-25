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
        this.cargarPrivilegios();
    };
    UsuarioComponent.prototype.guardarPrivilegio = function () {
        var _this = this;
        this.mostrarMensajeLoading();
        this.usuarios.crearPrivilegio(this.privilegioNuevo, this.nombre_municipalidad).subscribe(function (data) {
            _this.privilegioCreado = data;
            if (_this.privilegioCreado == true) {
                _this.privilegioNuevo = "";
                _this.mostrarMensajeExitoPrivilegio();
            }
            else {
                _this.mostrarMensajeError();
            }
        }, function (responseError) { return console.log(responseError); }, function () { });
    };
    UsuarioComponent.prototype.getUsuario = function (email) {
        var _this = this;
        for (var x = 0; x < this.usuariosMunicipalidad.length; x++) {
            if (this.usuariosMunicipalidad[x].email == email) {
                document.getElementById("nombreAct").innerHTML = this.usuariosMunicipalidad[x].nombre;
                document.getElementById("emailAct").innerHTML = this.usuariosMunicipalidad[x].email;
                if (this.usuariosMunicipalidad[x].enabled == true) {
                    $('#estadoActual').prop('checked', true);
                }
                this.usuarios.obtenerPrivilegiosUsu(this.usuariosMunicipalidad[x].email, this.nombre_municipalidad).subscribe(function (data) {
                    _this.privilegiosUsuario = data;
                    $('#privilegiosSelect').dropdown('clear');
                    $('#privilegiosSelect').dropdown('refresh');
                    for (var _i = 0, _a = _this.privilegiosUsuario; _i < _a.length; _i++) {
                        var pri = _a[_i];
                        $('#privilegiosSelect').dropdown('set selected', pri.Privilegio_nombre);
                        $('#privilegiosSelect').dropdown('refresh');
                    }
                }, function (responseError) { return console.log(responseError); }, function () { return console.log("Privilegios usu cargados"); });
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
    UsuarioComponent.prototype.cargarPrivilegios = function () {
        var _this = this;
        this.usuarios.obtenerPrivilegios(this.nombre_municipalidad).subscribe(function (data) {
            _this.privilegios = data;
        }, function (responseError) { return console.log(responseError); }, function () { return console.log("Privilegios cargados"); });
    };
    UsuarioComponent.prototype.guardar = function () {
        this.mostrarMensajeLoading();
        var b = false;
        if ($('#estadoActual').is(':checked')) {
            b = true;
        }
        this.usuarios.toggleEnabled(this.usuarioSelect, this.nombre_municipalidad, b).subscribe(function (data) { }, function (responseError) { return console.log(responseError); }, function () { });
        var e = $('#privilegiosSelect').dropdown("get value");
        var pirvTmp = this.privilegiosUsuario;
        for (var i = 0; i < (e.length - 1); i++) {
            var c = true;
            for (var _i = 0, _a = this.privilegiosUsuario; _i < _a.length; _i++) {
                var privUsu = _a[_i];
                if (privUsu.Privilegio_nombre == e[i].split("'")[1]) {
                    pirvTmp.splice(e[i].split("'")[1], 1);
                    c = false;
                }
            }
            if (c) {
                this.usuarios.modificarPrivilegios(this.usuarioSelect, this.nombre_municipalidad, e[i].split("'")[1]).subscribe(function (data) { }, function (responseError) { return console.log(responseError); }, function () { });
            }
        }
        for (var _b = 0, pirvTmp_1 = pirvTmp; _b < pirvTmp_1.length; _b++) {
            var privUsuBorrar = pirvTmp_1[_b];
            this.usuarios.eliminarPrivilegios(this.usuarioSelect, this.nombre_municipalidad, privUsuBorrar.Privilegio_nombre).subscribe(function (data) { }, function (responseError) { return console.log(responseError); }, function () { });
        }
        this.mostrarMensajeExito();
    };
    UsuarioComponent.prototype.mostrarMensajeExito = function () {
        document.getElementById("message").style.display = "block";
        document.getElementById("loading").style.display = "none";
        document.getElementById("exito").style.display = "block";
        document.getElementById("error").style.display = "none";
        document.getElementById("exitoPrivilegio").style.display = "none";
    };
    UsuarioComponent.prototype.mostrarMensajeError = function () {
        document.getElementById("message").style.display = "block";
        document.getElementById("loading").style.display = "none";
        document.getElementById("exito").style.display = "none";
        document.getElementById("error").style.display = "block";
        document.getElementById("exitoPrivilegio").style.display = "none";
    };
    UsuarioComponent.prototype.mostrarMensajeLoading = function () {
        document.getElementById("message").style.display = "block";
        document.getElementById("loading").style.display = "block";
        document.getElementById("exito").style.display = "none";
        document.getElementById("error").style.display = "none";
        document.getElementById("exitoPrivilegio").style.display = "none";
    };
    UsuarioComponent.prototype.mostrarMensajeExitoPrivilegio = function () {
        document.getElementById("message").style.display = "block";
        document.getElementById("loading").style.display = "none";
        document.getElementById("exito").style.display = "none";
        document.getElementById("error").style.display = "none";
        document.getElementById("exitoPrivilegio").style.display = "block";
    };
    UsuarioComponent.prototype.ocultarMensajes = function () {
        document.getElementById("message").style.display = "none";
        document.getElementById("loading").style.display = "none";
        document.getElementById("exito").style.display = "none";
        document.getElementById("error").style.display = "none";
        document.getElementById("exitoPrivilegio").style.display = "none";
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