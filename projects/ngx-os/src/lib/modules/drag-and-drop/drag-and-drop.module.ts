import { NgModule } from '@angular/core';
import { SharedModule } from '@lib-shared';
import { DraggableDirective } from './directives';

@NgModule({
    declarations: [
        DraggableDirective
    ],
    imports: [
        SharedModule
    ],
    exports: [
        DraggableDirective
    ]
})
export class DragAndDropModule {}
