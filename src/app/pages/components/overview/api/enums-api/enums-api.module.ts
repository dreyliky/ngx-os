import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';
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
