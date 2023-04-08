import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { ContextMenuComponent } from './context-menu';
import { EditorComponent } from './editor.component';

@NgModule({
    declarations: [
        EditorComponent,
        ContextMenuComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        EditorComponent
    ]
})
export class EditorModule {}
