import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExampleComponent } from './example.component';
import { RouteParam } from './route-param.enum';

const routes: Routes = [
    {
        path: `:${RouteParam.ComponentType}/:${RouteParam.ExampleName}`,
        component: ExampleComponent
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
export class ComponentExampleRoutingModule {}
