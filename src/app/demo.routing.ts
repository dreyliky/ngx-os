import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRouteEnum } from '@Core/enums';
import { ComponentLayoutComponent, MainLayoutComponent } from '@Layouts';

const routes: Routes = [
    {
        path: AppRouteEnum.Main,
        component: MainLayoutComponent,
        loadChildren: () => import('./pages/main/main.module').then((m) => m.MainModule)
    },
    {
        path: AppRouteEnum.Components,
        component: ComponentLayoutComponent,
        loadChildren: () => import('./pages/components/components.module').then((m) => m.ComponentsModule)
    },
    {
        path: AppRouteEnum.Desktop,
        loadChildren: () => import('./pages/desktop/desktop.module').then((m) => m.DesktopPageModule)
    },
    {
        path: AppRouteEnum.Theming,
        component: ComponentLayoutComponent,
        loadChildren: () => import('./pages/theming/theming.module').then((m) => m.ThemingModule)
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
