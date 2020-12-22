import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list';
import { OverviewComponent } from './overview';

const routes: Routes = [
    {
        path: '',
        component: ListComponent
    },
    {
        path: ':componentType',
        component: OverviewComponent
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
