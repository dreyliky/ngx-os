import { NgModule } from '@angular/core';
import { SharedModule } from 'os-angular/shared.module';
import { FieldRowComponent } from './field-row.component';

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
