import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';
import { ApiComponent } from './api.component';
import { ComponentApiModule } from './component-api';
import { DirectiveApiModule } from './directive-api';
import { ServiceApiModule } from './service-api';

@NgModule({
    declarations: [
        ApiComponent
    ],
    imports: [
        SharedModule,
        ComponentApiModule,
        ServiceApiModule,
        DirectiveApiModule
    ],
    exports: [
        ApiComponent
    ]
})
export class ApiModule {}
