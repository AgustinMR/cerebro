import { Routes, RouterModule } from '@angular/router';

import { AgrupacionComponent } from './agrupacion.component';
import { ChatComponent } from './chat.component';
import { IndexComponent } from './index.component';
import { OperadorComponent } from './operador.component';
import { ReporteComponent } from './reporte.component';
import { VisitanteComponent } from './visitante.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: IndexComponent, data: { title: 'Index' } },
    { path: 'agrupacion', component: AgrupacionComponent, data: { title: 'Agrupacion' } },
    { path: 'chat', component: ChatComponent, data: { title: 'Chat' } },
    { path: 'operador', component: OperadorComponent, data: { title: 'Operador' } },
    { path: 'reporte', component: ReporteComponent, data: { title: 'Reporte' } },
    { path: 'visitante', component: VisitanteComponent, data: { title: 'Visitante' } }
];

export const routing = RouterModule.forRoot(appRoutes);

export const routedComponents = [AgrupacionComponent, IndexComponent, ChatComponent, OperadorComponent, ReporteComponent, VisitanteComponent];