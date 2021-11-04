import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRouteEnum } from '@core/enums';
import { MainLayoutComponent } from '@layouts';

const routes: Routes = [
    {
        path: AppRouteEnum.Desktop,
        loadChildren: () => import('./pages/desktop/desktop.module').then((m) => m.DesktopPageModule)
    },
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {
                path: AppRouteEnum.Main,
                loadChildren: () => import('./pages/main/main.module').then((m) => m.MainModule)
            },
            {
                path: AppRouteEnum.Components,
                loadChildren: () => import('./pages/components/components.module').then((m) => m.ComponentsModule)
            },
            {
                path: AppRouteEnum.Guides,
                loadChildren: () => import('./pages/guides/guides.module').then((m) => m.GuidesModule)
            },
            {
                path: '**',
                redirectTo: AppRouteEnum.Main,
                pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}
