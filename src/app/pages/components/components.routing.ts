import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageStructureComponent } from './page-structure';

const routes: Routes = [
    {
        path: ':componentType',
        component: PageStructureComponent
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
