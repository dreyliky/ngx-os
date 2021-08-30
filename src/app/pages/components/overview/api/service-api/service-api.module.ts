import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';
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
        SharedModule
    ],
    exports: [
        ServiceApiComponent
    ]
})
export class ServiceApiModule {}
