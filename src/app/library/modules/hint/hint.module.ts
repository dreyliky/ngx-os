import { NgModule } from '@angular/core';
import { ɵSharedModule } from '../shared.module';
import { HintDirective } from './directives';

@NgModule({
    declarations: [
        HintDirective
    ],
    imports: [
        ɵSharedModule
    ],
    exports: [
        HintDirective
    ]
})
export class HintModule {}
