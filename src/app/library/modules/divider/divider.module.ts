import { NgModule } from '@angular/core';
import { ɵSharedModule } from '../shared.module';
import { DividerComponent } from './components';

@NgModule({
    declarations: [
        DividerComponent
    ],
    imports: [
        ɵSharedModule
    ],
    exports: [
        DividerComponent
    ]
})
export class DividerModule {}
