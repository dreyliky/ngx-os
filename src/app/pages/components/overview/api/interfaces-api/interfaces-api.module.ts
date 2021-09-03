import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';
import { ApiSharedModule } from '../shared';
import { InterfacesApiComponent } from './interfaces-api.component';
import { MethodsComponent } from './methods';
import { PropertiesComponent } from './properties';

@NgModule({
    declarations: [
        InterfacesApiComponent,
        PropertiesComponent,
        MethodsComponent
    ],
    imports: [
        SharedModule,
        ApiSharedModule
    ],
    exports: [
        InterfacesApiComponent
    ]
})
export class InterfacesApiModule {}
