import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';
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
