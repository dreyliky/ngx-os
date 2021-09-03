import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';
import { ApiSharedModule } from '../shared';
import { MethodsComponent } from './methods';
import { PropertiesComponent } from './properties';
import { ServicesApiComponent } from './services-api.component';

@NgModule({
    declarations: [
        ServicesApiComponent,
        PropertiesComponent,
        MethodsComponent
    ],
    imports: [
        SharedModule,
        ApiSharedModule
    ],
    exports: [
        ServicesApiComponent
    ]
})
export class ServicesApiModule {}
