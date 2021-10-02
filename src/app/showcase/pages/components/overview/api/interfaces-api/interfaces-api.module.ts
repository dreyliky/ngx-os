import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';
import { ApiSharedModule } from '../shared';
import { InterfacesApiComponent } from './interfaces-api.component';

@NgModule({
    declarations: [
        InterfacesApiComponent
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
