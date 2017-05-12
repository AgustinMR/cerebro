import { NgModule } from '@angular/core';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import "rxjs/add/operator/map";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from './app.component';

// Agrupacion
import { AgrupacionComponent } from './agrupacion/agrupacion.component';
import { AgrupacionService } from './agrupacion/agrupacion.service';
// Chat
import { ChatComponent } from './chat/chat.component';
import { ChatService } from './chat/chat.service';
// Operador
import { OperadorComponent } from './operador/operador.component';
import { OperadorService } from './operador/operador.service';
// Reporte
import { ReporteComponent } from './reporte/reporte.component';
import { ReporteService } from './reporte/reporte.service';
// Visitante
import { VisitanteComponent } from './visitante/visitante.component';
import { VisitanteService } from './visitante/visitante.service';
// Index
import { IndexComponent } from './index/index.component';
import { IndexService } from './index/index.service';

//import { EmployeeService } from './employee/employee.service';
//import { EmployeeTaskService, ChannelConfig, SignalrWindow } from './employee/employee.task.service';
//let channelConfig = new ChannelConfig();
//channelConfig.url = "http://localhost:9123/signalr";
//channelConfig.hubName = "EmployeeHub";

@NgModule({
    imports: [BrowserModule, AppRoutingModule, CommonModule, ReactiveFormsModule, FormsModule, HttpModule, InMemoryWebApiModule],
    declarations: [AppComponent, AgrupacionComponent, ChatComponent, OperadorComponent, ReporteComponent, VisitanteComponent, IndexComponent],
    //providers: [EmployeeService, HttpModule, EmployeeTaskService,
    //    { provide: SignalrWindow, useValue: window },
    //    { provide: 'channel.config', useValue: channelConfig }],
    providers: [AgrupacionService, ChatService, OperadorService, ReporteService, VisitanteService, IndexService, HttpModule],
    bootstrap: [AppComponent]
})
export class AppModule { }
