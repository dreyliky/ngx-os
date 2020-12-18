import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComponentsRouteEnum } from './components-route.enum';

const routes: Routes = [
    {
        path: ComponentsRouteEnum.Button,
        loadChildren: () => import('./button/button.module').then((m) => m.ButtonModule)
    },
    {
        path: '',
        redirectTo: ComponentsRouteEnum.Button,
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: ComponentsRouteEnum.Button,
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class ComponentsRoutingModule {}
