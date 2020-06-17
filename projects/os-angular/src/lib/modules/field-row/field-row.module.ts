import { NgModule } from '@angular/core';
import { FieldRowComponent } from './field-row.component';
import { SharedModule } from '../../shared.module';

@NgModule({
    declarations: [
        FieldRowComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        FieldRowComponent
    ]
})
export class FieldRowModule {}
