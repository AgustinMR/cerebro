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
// Estadistica
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { EstadisticaService } from './estadistica/estadistica.service';
// Login    
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';

//import { EmployeeService } from './employee/employee.service';
//import { EmployeeTaskService, ChannelConfig, SignalrWindow } from './employee/employee.task.service';
//let channelConfig = new ChannelConfig();
//channelConfig.url = "http://localhost:9123/signalr";
//channelConfig.hubName = "EmployeeHub";

@NgModule({
    imports: [BrowserModule, AppRoutingModule, CommonModule, ReactiveFormsModule, FormsModule, HttpModule],
    declarations: [AppComponent, FuenteDeDatoComponent, TipoDeFuenteDeDatoComponent, EventoComponent, UsuarioComponent, EstadisticaComponent, LoginComponent],
    //providers: [EmployeeService, HttpModule, EmployeeTaskService,
    //    { provide: SignalrWindow, useValue: window },
    //    { provide: 'channel.config', useValue: channelConfig }],
    providers: [FuenteDeDatoService, TipoDeFuenteDeDatoService, EventoService, UsuarioService, EstadisticaService, HttpModule, LoginService],
    bootstrap: [AppComponent]
})
export class AppModule { }
