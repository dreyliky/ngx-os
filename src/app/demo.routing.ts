import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentationRouteEnum } from '@Core/enums';
import { ComponentLayoutComponent } from '@Layouts';

const routes: Routes = [
    {
        path: DocumentationRouteEnum.Main,
        loadChildren: () => import('./pages/main/main.module').then((m) => m.MainModule)
    },
    {
        path: DocumentationRouteEnum.Components,
        component: ComponentLayoutComponent,
        loadChildren: () => import('./pages/components/components.module').then((m) => m.ComponentsModule)
    },
    {
        path: DocumentationRouteEnum.Desktop,
        loadChildren: () => import('./pages/desktop/desktop.module').then((m) => m.DesktopPageModule)
    },
    {
        path: '',
        redirectTo: DocumentationRouteEnum.Main,
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: DocumentationRouteEnum.Main,
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
