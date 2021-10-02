import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
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
