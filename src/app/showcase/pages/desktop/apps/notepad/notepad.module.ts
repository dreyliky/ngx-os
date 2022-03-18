import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import {
    AboutWindowModule,
    FontWindowModule,
    NotepadMenuBarModule
} from './components';
import { NotepadAppComponent } from './notepad.component';
import { EditorComponent } from './components/editor/editor.component';

@NgModule({
    declarations: [
        NotepadAppComponent,
        EditorComponent
    ],
    imports: [
        SharedModule,
        NotepadMenuBarModule,
        FontWindowModule,
        AboutWindowModule
    ]
})
export class NotepadAppModule {}
