import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRouteEnum } from '@Core/enums';
import { MainLayoutComponent } from '@Layouts';

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
                path: AppRouteEnum.GetStarted,
                loadChildren: () => import('./pages/get-started/get-started.module').then((m) => m.GetStartedModule)
            },
            {
                path: AppRouteEnum.Components,
                loadChildren: () => import('./pages/components/components.module').then((m) => m.ComponentsModule)
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
