import { NgModule } from '@angular/core';
import { ɵSharedModule } from '../shared.module';
import { NumberBoxComponent } from './components';

@NgModule({
    declarations: [
        NumberBoxComponent
    ],
    imports: [
        ɵSharedModule
    ],
    exports: [
        NumberBoxComponent
    ]
})
export class NumberBoxModule {}
