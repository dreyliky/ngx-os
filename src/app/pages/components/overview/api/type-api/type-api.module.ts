import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';
import { TypeApiComponent } from './type-api.component';

@NgModule({
    declarations: [
        TypeApiComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        TypeApiComponent
    ]
})
export class TypeApiModule {}
