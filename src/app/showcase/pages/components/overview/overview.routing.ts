import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from '.';
import { ComponentOverviewRouteEnum as RouteEnum } from './enums';

const routes: Routes = [
    {
        path: '',
        component: OverviewComponent,
        children: [
            {
                path: RouteEnum.Documentation,
                loadChildren: () => import('./containers/documentation/documentation.module').then((m) => m.DocumentationModule)
            },
            {
                path: RouteEnum.Examples,
                loadChildren: () => import('./containers/examples/examples.module').then((m) => m.ExamplesModule)
            },
            {
                path: RouteEnum.Api,
                loadChildren: () => import('./containers/api/api.module').then((m) => m.ApiModule)
            },
            {
                path: '**',
                redirectTo: RouteEnum.Documentation,
                pathMatch: 'full'
            }
        ]
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
export class ComponentOverviewRoutingModule {}
