import { NgModule } from '@angular/core';
import { SharedModule } from '@lib-shared';
import { NumberBoxComponent } from './components';

@NgModule({
    declarations: [
        NumberBoxComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        NumberBoxComponent
    ]
})
export class NumberBoxModule {}
