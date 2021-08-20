import { NgModule } from '@angular/core';
import { SharedModule } from '@lib';
import { FieldRowComponent } from './components';

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
