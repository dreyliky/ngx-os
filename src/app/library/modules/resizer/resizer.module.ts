import { NgModule } from '@angular/core';
import { ɵSharedModule } from '../shared.module';
import { ResizableDirective } from './directives';

@NgModule({
    declarations: [
        ResizableDirective
    ],
    imports: [
        ɵSharedModule
    ],
    exports: [
        ResizableDirective
    ]
})
export class ResizerModule {}
