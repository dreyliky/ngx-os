import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridComponent } from './list';
import { OverviewComponent } from './overview';

const routes: Routes = [
    {
        path: '',
        component: GridComponent
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
