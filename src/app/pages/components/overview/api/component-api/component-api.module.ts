import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';
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
        SharedModule
    ],
    exports: [
        ComponentApiComponent
    ]
})
export class ComponentApiModule {}
