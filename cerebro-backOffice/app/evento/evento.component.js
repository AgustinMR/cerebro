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
var evento_service_1 = require("./evento.service");
require("rxjs/add/operator/toPromise");
var EventoComponent = (function () {
    function EventoComponent(eventos) {
        this.eventos = eventos;
        this.nombre_municipalidad = "";
        this.nombre = "";
        this.nombreMod = "";
        this.accionSelect = "";
        this.accionSelectMod = "";
        this.eventoSelect = "";
    }
    EventoComponent.prototype.ngOnInit = function () {
        $(document).ready(function () {
            $('.ui.sidebar').sidebar('attach events', '.toc.item');
            $('.ui.dropdown').dropdown();
        });
        var muniL = window.location.toString().split("/")[2].split(".")[1].split("");
        this.nombre_municipalidad = muniL[0].toUpperCase();
        for (var h = 1; h < muniL.length; h++) {
            this.nombre_municipalidad += muniL[h];
        }
        this.cargarDispositivos();
    };
    EventoComponent.prototype.cargarDispositivos = function () {
        var _this = this;
        this.eventos.obtenerDis(this.nombre_municipalidad).subscribe(function (data) {
            _this.dispositivos = data;
            _this.cargarAcciones();
            _this.cargarTipos();
        }, function (responseError) { return console.log(responseError); }, function () { return console.log("Fuentes de datos cargadas"); });
    };
    EventoComponent.prototype.cargarTipos = function () {
        var _this = this;
        this.eventos.obtenerTipos(this.nombre_municipalidad).subscribe(function (data) {
            _this.tipos = data;
        }, function (responseError) { return console.log(responseError); }, function () { return console.log("Tipos de datos cargados"); });
    };
    EventoComponent.prototype.cargarEventos = function () {
        var _this = this;
        document.getElementById("dispositivosDiv").innerHTML = "";
        this.eventos.obtenerEventos(this.nombre_municipalidad).subscribe(function (data) {
            _this.eventosMod = data;
        }, function (responseError) { return console.log(responseError); }, function () { return console.log("Eventos cargados"); });
    };
    EventoComponent.prototype.cargarAcciones = function () {
        var _this = this;
        this.eventos.obtenerAcciones(this.nombre_municipalidad).subscribe(function (data) {
            _this.acciones = data;
        }, function (responseError) { return console.log(responseError); }, function () { return console.log("Acciones cargadas"); });
    };
    EventoComponent.prototype.addEvento = function () {
        var _this = this;
        var num = document.getElementById("dispositivosDiv").getElementsByTagName('SELECT').length;
        if (this.nombre != "" && this.accionSelect != "" && num > 0) {
            this.eventos.addEvento(this.nombre, this.nombre_municipalidad, this.accionSelect).subscribe(function (data) { return _this.eventoAgregado = data; }, function (responseError) { return console.log(responseError); }, function () {
                for (var i = 0; i < num; i++) {
                    var idDis = document.getElementById("dispositivosDiv").getElementsByTagName('SELECT')[i].value;
                    var valLim = document.getElementById("dispositivosDiv").getElementsByTagName('INPUT')[i].value;
                    _this.eventos.addUmbral(_this.eventoAgregado, idDis, valLim).subscribe(function (data) { }, function (responseError) { return console.log(responseError); }, function () { });
                }
                _this.nombre = "";
                document.getElementById("dispositivosDiv").innerHTML = "";
            });
        }
    };
    EventoComponent.prototype.onChange = function (val) {
        var _this = this;
        for (var _i = 0, _a = this.eventosMod; _i < _a.length; _i++) {
            var e = _a[_i];
            if (e.Id == val) {
                this.nombreMod = e.nombre;
                $('#accionesMod').dropdown('set selected', e.accion);
                $('#accionesMod').dropdown('refresh');
                this.eventos.obtenerUmbrales(e.Id).subscribe(function (data) {
                    _this.umbralesMod = data;
                    document.getElementById("dispositivosDivMod").innerHTML = "";
                    for (var _i = 0, _a = _this.umbralesMod; _i < _a.length; _i++) {
                        var umb = _a[_i];
                        _this.addDisEventoMod();
                        $('SELECT').eq(2).dropdown('set selected', umb.fuenteDeDatoId);
                        document.getElementById("dispositivosDivMod").getElementsByTagName('INPUT')[0].value = umb.valorLimite;
                        document.getElementById("dispositivosDivMod").getElementsByTagName('DIV')[0].value = umb.Id;
                    }
                }, function (responseError) { return console.log(responseError); }, function () { });
            }
        }
    };
    EventoComponent.prototype.borrarEve = function () {
        var _this = this;
        this.eventos.deleteEve(this.eventoSelect).subscribe(function (data) {
            _this.nombreMod = "";
            document.getElementById("dispositivosDivMod").innerHTML = "";
            _this.cargarEventos();
        }, function (responseError) { return console.log(responseError); }, function () { return console.log("Evento borrado"); });
    };
    EventoComponent.prototype.modificarEve = function () {
        var _this = this;
        var num = document.getElementById("dispositivosDivMod").getElementsByTagName('SELECT').length;
        this.eventos.updateEvento(this.eventoSelect, this.nombreMod, this.accionSelectMod).subscribe(function (data) {
            _this.cargarEventos();
        }, function (responseError) { return console.log(responseError); }, function () {
            var umbralesTmp = _this.umbralesMod;
            for (var i = 0; i < num; i++) {
                var divVal = document.getElementById("dispositivosDivMod").getElementsByTagName('DIV')[0];
                var idDis = document.getElementById("dispositivosDivMod").getElementsByTagName('SELECT')[0].value;
                var valLim = document.getElementById("dispositivosDivMod").getElementsByTagName('INPUT')[0].value;
                if (divVal.value != null) {
                    for (var umb in _this.umbralesMod) {
                        if (_this.umbralesMod[umb].Id == divVal.value) {
                            umbralesTmp.splice(umb, 1);
                        }
                    }
                    _this.eventos.updateUmbral(divVal.value, _this.eventoSelect, idDis, valLim).subscribe(function (data) { }, function (responseError) { return console.log(responseError); }, function () { });
                }
                else {
                    //alert(this.eventoSelect + " " + idDis +" " +  valLim);
                    _this.eventos.addUmbral(_this.eventoSelect, idDis, valLim).subscribe(function (data) { }, function (responseError) { return console.log(responseError); }, function () { });
                }
                document.getElementById("dispositivosDivMod").removeChild(divVal);
            }
            for (var _i = 0, umbralesTmp_1 = umbralesTmp; _i < umbralesTmp_1.length; _i++) {
                var umbT = umbralesTmp_1[_i];
                _this.eventos.deleteUmbral(umbT.Id).subscribe(function (data) { }, function (responseError) { return console.log(responseError); }, function () { });
            }
            _this.nombre = "";
            document.getElementById("dispositivosDiv").innerHTML = "";
        });
    };
    EventoComponent.prototype.addDisEvento = function () {
        var num = document.getElementById("dispositivosDiv").getElementsByTagName('SELECT').length;
        var segments = document.createElement("div");
        segments.id = "mainDiv" + num;
        segments.className = "ui segment grey";
        var button = document.createElement("button");
        button.className = "circular inverted orange compact ui icon button w3-margin-bottom";
        button.addEventListener("click", function () {
            document.getElementById("dispositivosDiv").removeChild(segments);
        });
        var i1 = document.createElement("i");
        i1.className = "icon remove";
        var select = document.createElement("select");
        select.id = "select0";
        select.className = "ui fluid dropdown";
        var option0 = document.createElement("option");
        option0.value = "";
        option0.innerHTML = "Seleccione un dispositivo...";
        select.appendChild(option0);
        var tipo = "";
        for (var _i = 0, _a = this.dispositivos; _i < _a.length; _i++) {
            var d = _a[_i];
            var option = document.createElement("option");
            option.value = d.Id;
            for (var _b = 0, _c = this.tipos; _b < _c.length; _b++) {
                var t = _c[_b];
                if (d.tipo == t.Id) {
                    switch (t.tipo) {
                        case 0:
                            tipo = " (Texto)";
                            break;
                        case 1:
                            tipo = " (Numerico)";
                            break;
                        case 2:
                            tipo = " (Imagen)";
                            break;
                        case 3:
                            tipo = " (Video)";
                    }
                }
            }
            option.innerHTML = d.nombre + tipo;
            select.appendChild(option);
        }
        var segments2 = document.createElement("div");
        segments2.className = "ui labeled fluid input w3-margin-top";
        var segments4 = document.createElement("div");
        segments4.className = "ui label w3-text-cerebro-red";
        segments4.innerHTML = "Umbral:";
        var imp = document.createElement("input");
        imp.id = "nombre" + num;
        imp.placeholder = "Ingrese el valor máximo hasta el cuál se considera normal...";
        imp.type = "text";
        segments.appendChild(button);
        button.appendChild(i1);
        segments.appendChild(select);
        segments.appendChild(segments2);
        segments2.appendChild(segments4);
        segments2.appendChild(imp);
        document.getElementById("dispositivosDiv").insertBefore(segments, document.getElementById("dispositivosDiv").firstChild);
        $('.ui.dropdown').dropdown();
    };
    EventoComponent.prototype.addDisEventoMod = function () {
        var num = document.getElementById("dispositivosDivMod").getElementsByTagName('SELECT').length;
        var segments = document.createElement("div");
        segments.id = "mainDiv" + num;
        segments.className = "ui segment grey";
        var button = document.createElement("button");
        button.className = "circular inverted orange compact ui icon button w3-margin-bottom";
        button.addEventListener("click", function () {
            document.getElementById("dispositivosDivMod").removeChild(segments);
        });
        var i1 = document.createElement("i");
        i1.className = "icon remove";
        var select = document.createElement("select");
        select.id = "select0";
        select.className = "ui fluid dropdown";
        var option0 = document.createElement("option");
        option0.value = "";
        option0.innerHTML = "Seleccione un dispositivo...";
        select.appendChild(option0);
        var tipo = "";
        for (var _i = 0, _a = this.dispositivos; _i < _a.length; _i++) {
            var d = _a[_i];
            var option = document.createElement("option");
            option.value = d.Id;
            for (var _b = 0, _c = this.tipos; _b < _c.length; _b++) {
                var t = _c[_b];
                if (d.tipo == t.Id) {
                    switch (t.tipo) {
                        case 0:
                            tipo = " (Texto)";
                            break;
                        case 1:
                            tipo = " (Numerico)";
                            break;
                        case 2:
                            tipo = " (Imagen)";
                            break;
                        case 3:
                            tipo = " (Video)";
                    }
                }
            }
            option.innerHTML = d.nombre + tipo;
            select.appendChild(option);
        }
        var segments2 = document.createElement("div");
        segments2.className = "ui labeled fluid input w3-margin-top";
        var segments4 = document.createElement("div");
        segments4.className = "ui label w3-text-cerebro-red";
        segments4.innerHTML = "Umbral:";
        var imp = document.createElement("input");
        imp.id = "nombre" + num;
        imp.placeholder = "Ingrese el valor máximo hasta el cuál se considera normal...";
        imp.type = "text";
        segments.appendChild(button);
        button.appendChild(i1);
        segments.appendChild(select);
        segments.appendChild(segments2);
        segments2.appendChild(segments4);
        segments2.appendChild(imp);
        document.getElementById("dispositivosDivMod").insertBefore(segments, document.getElementById("dispositivosDivMod").firstChild);
        $('.ui.dropdown').dropdown();
    };
    EventoComponent.prototype.mostrarStep1 = function () {
        document.getElementById("step1").style.display = "block";
        document.getElementById("step2").style.display = "none";
        document.getElementById("step3").style.display = "none";
        document.getElementById("s1").className = "active step";
        document.getElementById("s2").className = "link step";
        document.getElementById("s3").className = "link step";
        document.getElementById("stepMod1").style.display = "block";
        document.getElementById("stepMod2").style.display = "none";
        document.getElementById("stepMod3").style.display = "none";
        document.getElementById("sm1").className = "active step";
        document.getElementById("sm2").className = "link step";
        document.getElementById("sm3").className = "link step";
    };
    EventoComponent.prototype.mostrarStep2 = function () {
        document.getElementById("step1").style.display = "none";
        document.getElementById("step2").style.display = "block";
        document.getElementById("step3").style.display = "none";
        document.getElementById("s2").className = "active step";
        document.getElementById("s1").className = "link step";
        document.getElementById("s3").className = "link step";
        document.getElementById("stepMod1").style.display = "none";
        document.getElementById("stepMod2").style.display = "block";
        document.getElementById("stepMod3").style.display = "none";
        document.getElementById("sm1").className = "link step";
        document.getElementById("sm2").className = "active step";
        document.getElementById("sm3").className = "link step";
    };
    EventoComponent.prototype.mostrarStep3 = function () {
        document.getElementById("step1").style.display = "none";
        document.getElementById("step2").style.display = "none";
        document.getElementById("step3").style.display = "block";
        document.getElementById("s3").className = "active step";
        document.getElementById("s2").className = "link step";
        document.getElementById("s1").className = "link step";
        document.getElementById("stepMod1").style.display = "none";
        document.getElementById("stepMod2").style.display = "none";
        document.getElementById("stepMod3").style.display = "block";
        document.getElementById("sm1").className = "link step";
        document.getElementById("sm2").className = "link step";
        document.getElementById("sm3").className = "active step";
    };
    return EventoComponent;
}());
EventoComponent = __decorate([
    core_1.Component({
        selector: 'cerebro-evento',
        templateUrl: 'evento.component.html',
        styleUrls: ['evento.component.css'],
        moduleId: module.id,
        providers: [evento_service_1.EventoService]
    }),
    __metadata("design:paramtypes", [evento_service_1.EventoService])
], EventoComponent);
exports.EventoComponent = EventoComponent;
//# sourceMappingURL=evento.component.js.map