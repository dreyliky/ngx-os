import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OsComponentOverviewSectionEnum as RouteEnum } from '@features/documentation';
import { OverviewComponent } from './overview.component';

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
                path: RouteEnum.Theming,
                loadChildren: () => import('./containers/theming/theming.module').then((m) => m.ThemingModule)
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
