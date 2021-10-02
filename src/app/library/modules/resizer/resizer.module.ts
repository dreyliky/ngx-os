import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { ResizableDirective } from './directives';

@NgModule({
    declarations: [
        ResizableDirective
    ],
    imports: [
        SharedModule
    ],
    exports: [
        ResizableDirective
    ]
})
export class ResizerModule {}
