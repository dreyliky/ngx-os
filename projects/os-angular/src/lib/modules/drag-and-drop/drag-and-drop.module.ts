import { NgModule } from '@angular/core';
import { SharedModule } from 'os-angular/shared.module';

import {
    OsDraggableDirective
} from './directives';

@NgModule({
    declarations: [
        OsDraggableDirective
    ],
    imports: [
        SharedModule
    ],
    exports: [
        OsDraggableDirective
    ]
})
export class DragAndDropModule {}
