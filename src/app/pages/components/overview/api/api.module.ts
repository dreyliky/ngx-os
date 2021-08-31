import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';
import { ApiComponent } from './api.component';
import { ComponentApiModule } from './component-api';
import { DirectiveApiModule } from './directive-api';
import { ServiceApiModule } from './service-api';
import { ApiSharedModule } from './shared';

@NgModule({
    declarations: [
        ApiComponent
    ],
    imports: [
        SharedModule,
        ApiSharedModule,
        ComponentApiModule,
        ServiceApiModule,
        DirectiveApiModule
    ],
    exports: [
        ApiComponent
    ]
})
export class ApiModule {}
