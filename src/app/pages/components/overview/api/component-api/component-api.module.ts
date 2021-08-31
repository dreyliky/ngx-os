import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';
import { ApiSharedModule } from '../shared';
import { ComponentApiComponent } from './component-api.component';
import { EventsComponent } from './events';
import { MethodsComponent } from './methods';
import { PropertiesComponent } from './properties';

@NgModule({
    declarations: [
        ComponentApiComponent,
        PropertiesComponent,
        MethodsComponent,
        EventsComponent
    ],
    imports: [
        SharedModule,
        ApiSharedModule
    ],
    exports: [
        ComponentApiComponent
    ]
})
export class ComponentApiModule {}
