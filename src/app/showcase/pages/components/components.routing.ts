import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list';

const routes: Routes = [
    {
        path: '',
        component: ListComponent
    },
    {
        path: ':componentType',
        loadChildren: () => import('./overview/overview.module').then((m) => m.OverviewModule)
    },
    {
        path: '**',
        redirectTo: '',
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
