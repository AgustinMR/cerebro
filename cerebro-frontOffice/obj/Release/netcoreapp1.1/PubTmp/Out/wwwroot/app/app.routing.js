"use strict";
var router_1 = require("@angular/router");
var agrupacion_component_1 = require("./agrupacion.component");
var chat_component_1 = require("./chat.component");
var index_component_1 = require("./index.component");
var operador_component_1 = require("./operador.component");
var reporte_component_1 = require("./reporte.component");
var visitante_component_1 = require("./visitante.component");
var appRoutes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: index_component_1.IndexComponent, data: { title: 'Index' } },
    { path: 'agrupacion', component: agrupacion_component_1.AgrupacionComponent, data: { title: 'Agrupacion' } },
    { path: 'chat', component: chat_component_1.ChatComponent, data: { title: 'Chat' } },
    { path: 'operador', component: operador_component_1.OperadorComponent, data: { title: 'Operador' } },
    { path: 'reporte', component: reporte_component_1.ReporteComponent, data: { title: 'Reporte' } },
    { path: 'visitante', component: visitante_component_1.VisitanteComponent, data: { title: 'Visitante' } }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
exports.routedComponents = [agrupacion_component_1.AgrupacionComponent, index_component_1.IndexComponent, chat_component_1.ChatComponent, operador_component_1.OperadorComponent, reporte_component_1.ReporteComponent, visitante_component_1.VisitanteComponent];
//# sourceMappingURL=app.routing.js.map