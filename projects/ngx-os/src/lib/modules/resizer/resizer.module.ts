import { NgModule } from '@angular/core';
import { SharedModule } from '@lib-shared';
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
