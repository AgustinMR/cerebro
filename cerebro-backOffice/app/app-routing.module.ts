import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HashLocationStrategy, Location, LocationStrategy } from '@angular/common';

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

const routes: Routes = [
    { path: 'dispositivos', component: FuenteDeDatoComponent },
    { path: 'eventos', component: EventoComponent },
    { path: 'acciones', component: AccionComponent },
    { path: 'inicio', component: InicioComponent },
    { path: 'tipos', component: TipoDeFuenteDeDatoComponent },
    { path: 'usuarios', component: UsuarioComponent },
    { path: '', redirectTo: 'inicio', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [Location, { provide: LocationStrategy, useClass: HashLocationStrategy }, FuenteDeDatoService, AccionService, EventoService, TipoDeFuenteDeDatoService, UsuarioService, LoginService]
})
export class AppRoutingModule { }