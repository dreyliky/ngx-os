import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { ApiSharedModule } from '../shared';
import { EnumsApiComponent } from './enums-api.component';

@NgModule({
    declarations: [
        EnumsApiComponent
    ],
    imports: [
        SharedModule,
        ApiSharedModule
    ],
    exports: [
        EnumsApiComponent
    ]
})
export class EnumsApiModule {}
