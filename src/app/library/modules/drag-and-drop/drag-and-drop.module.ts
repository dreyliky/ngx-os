import { NgModule } from '@angular/core';
import { ɵSharedModule } from '../shared.module';
import { DraggableDirective, DraggableItemDirective, DraggableZoneDirective } from './directives';

@NgModule({
    declarations: [
        DraggableDirective,
        DraggableZoneDirective,
        DraggableItemDirective
    ],
    imports: [
        ɵSharedModule
    ],
    exports: [
        DraggableDirective,
        DraggableZoneDirective,
        DraggableItemDirective
    ]
})
export class DragAndDropModule {}
