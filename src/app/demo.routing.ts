import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRouteEnum } from '@Core/enums';
import { ComponentOverviewLayoutComponent, MainLayoutComponent } from '@Layouts';

const routes: Routes = [
    {
        path: AppRouteEnum.Main,
        component: MainLayoutComponent,
        loadChildren: () => import('./pages/main/main.module').then((m) => m.MainModule)
    },
    {
        path: AppRouteEnum.GetStarted,
        component: MainLayoutComponent,
        loadChildren: () => import('./pages/get-started/get-started.module').then((m) => m.GetStartedModule)
    },
    {
        path: AppRouteEnum.Components,
        component: ComponentOverviewLayoutComponent,
        loadChildren: () => import('./pages/components/components.module').then((m) => m.ComponentsModule)
    },
    {
        path: AppRouteEnum.Desktop,
        loadChildren: () => import('./pages/desktop/desktop.module').then((m) => m.DesktopPageModule)
    },
    {
        path: '',
        redirectTo: AppRouteEnum.Main,
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: AppRouteEnum.Main,
        pathMatch: 'full'
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
