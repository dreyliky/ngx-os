import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';
import { InterfaceApiComponent } from './interface-api.component';
import { MethodsComponent } from './methods';
import { PropertiesComponent } from './properties';

@NgModule({
    declarations: [
        InterfaceApiComponent,
        PropertiesComponent,
        MethodsComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        InterfaceApiComponent
    ]
})
export class InterfaceApiModule {}
