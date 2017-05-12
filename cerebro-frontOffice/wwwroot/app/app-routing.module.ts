import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HashLocationStrategy, Location, LocationStrategy } from '@angular/common';

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

const routes: Routes = [
    { path: 'agrupacion', component: AgrupacionComponent },
    { path: 'chat', component: ChatComponent },
    { path: 'operador', component: OperadorComponent },
    { path: 'reporte', component: ReporteComponent },
    { path: 'visitante', component: VisitanteComponent },
    { path: 'index', component: IndexComponent },
    { path: '', redirectTo: 'index', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [Location, { provide: LocationStrategy, useClass: HashLocationStrategy }, AgrupacionService, ChatService, OperadorService, ReporteService, VisitanteService, IndexService]
})
export class AppRoutingModule { }