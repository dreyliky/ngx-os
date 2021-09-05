import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';
import { ApiSharedModule } from '../shared';
import { ComponentsApiComponent } from './components-api.component';
import { MethodsComponent } from './methods';
import { PropertiesComponent } from './properties';

@NgModule({
    declarations: [
        ComponentsApiComponent,
        PropertiesComponent,
        MethodsComponent
    ],
    imports: [
        SharedModule,
        ApiSharedModule
    ],
    exports: [
        ComponentsApiComponent
    ]
})
export class ComponentsApiModule {}
