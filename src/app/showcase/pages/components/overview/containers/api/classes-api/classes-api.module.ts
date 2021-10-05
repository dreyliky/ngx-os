import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { ApiSharedModule } from '../shared';
import { ClassesApiComponent } from './classes-api.component';

@NgModule({
    declarations: [
        ClassesApiComponent
    ],
    imports: [
        SharedModule,
        ApiSharedModule
    ],
    exports: [
        ClassesApiComponent
    ]
})
export class ClassesApiModule {}
