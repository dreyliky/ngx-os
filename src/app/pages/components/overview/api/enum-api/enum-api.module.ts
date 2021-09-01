import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';
import { EnumApiComponent } from './enum-api.component';

@NgModule({
    declarations: [
        EnumApiComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        EnumApiComponent
    ]
})
export class EnumApiModule {}
