import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';
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
