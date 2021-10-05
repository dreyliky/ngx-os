import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { ApiSharedModule } from '../shared';
import { TypesApiComponent } from './types-api.component';

@NgModule({
    declarations: [
        TypesApiComponent
    ],
    imports: [
        SharedModule,
        ApiSharedModule
    ],
    exports: [
        TypesApiComponent
    ]
})
export class TypesApiModule {}
