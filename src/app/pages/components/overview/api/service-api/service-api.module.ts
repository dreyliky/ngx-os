import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';
import { ApiSharedModule } from '../shared';
import { MethodsComponent } from './methods';
import { PropertiesComponent } from './properties';
import { ServiceApiComponent } from './service-api.component';

@NgModule({
    declarations: [
        ServiceApiComponent,
        PropertiesComponent,
        MethodsComponent
    ],
    imports: [
        SharedModule,
        ApiSharedModule
    ],
    exports: [
        ServiceApiComponent
    ]
})
export class ServiceApiModule {}
