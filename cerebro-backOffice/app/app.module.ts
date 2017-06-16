import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import "rxjs/add/operator/map";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from './app.component';

// Fuentes de Dato
import { FuenteDeDatoComponent } from './dispositivo/dispositivo.component';
import { FuenteDeDatoService } from './dispositivo/dispositivo.service';
// Eventos
import { EventoComponent } from './evento/evento.component';
import { EventoService } from './evento/evento.service';
// Tipos de Fuentes de Datos
import { TipoDeFuenteDeDatoComponent } from './tipo/tipo.component';
import { TipoDeFuenteDeDatoService } from './tipo/tipo.service';
// Usuarios
import { UsuarioComponent } from './usuario/usuario.component';
import { UsuarioService } from './usuario/usuario.service';
// Inicio
import { InicioComponent } from './inicio/inicio.component';
import { LoginService } from './inicio/login.service'
// Accion
import { AccionComponent } from './acciones/accion.component';
import { AccionService } from './acciones/accion.service'

@NgModule({
    imports: [BrowserModule, AppRoutingModule, CommonModule, ReactiveFormsModule, FormsModule, HttpModule],
    declarations: [AppComponent, FuenteDeDatoComponent, TipoDeFuenteDeDatoComponent, EventoComponent, UsuarioComponent, InicioComponent, AccionComponent],
    providers: [FuenteDeDatoService, TipoDeFuenteDeDatoService, EventoService, UsuarioService, HttpModule, LoginService, AccionService],
    bootstrap: [AppComponent]
})
export class AppModule { }
