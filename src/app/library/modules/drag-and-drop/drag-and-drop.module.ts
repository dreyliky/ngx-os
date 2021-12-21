import { NgModule } from '@angular/core';
import { ɵSharedModule } from '../shared.module';
import { DraggableDirective } from './directives';

@NgModule({
    declarations: [
        DraggableDirective
    ],
    imports: [
        ɵSharedModule
    ],
    exports: [
        DraggableDirective
    ]
})
export class DragAndDropModule {}
