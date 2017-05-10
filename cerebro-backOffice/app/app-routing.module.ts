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
// Estadistica
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { EstadisticaService } from './estadistica/estadistica.service';
// Login    
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
// Inicio
import { InicioComponent } from './inicio/inicio.component';
import { InicioService } from './inicio/inicio.service';

const routes: Routes = [
    { path: 'dispositivos', component: FuenteDeDatoComponent },
    { path: 'estadisticas', component: EstadisticaComponent },
    { path: 'eventos', component: EventoComponent },
    { path: 'login', component: LoginComponent },
    { path: 'inicio', component: InicioComponent },
    { path: 'tipos', component: TipoDeFuenteDeDatoComponent },
    { path: 'usuarios', component: UsuarioComponent },
    { path: '', redirectTo: 'inicio', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [Location, { provide: LocationStrategy, useClass: HashLocationStrategy }, FuenteDeDatoService, EstadisticaService, EventoService, TipoDeFuenteDeDatoService, UsuarioService, LoginService, InicioService]
})
export class AppRoutingModule { }