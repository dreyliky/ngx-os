import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import {
    AboutWindowModule,
    DocumentCreationWindowModule,
    DocumentDownloaderWindowModule,
    EditorModule,
    FontWindowModule,
    MenuBarModule
} from './components';
import { NotepadAppComponent } from './notepad.component';

@NgModule({
    declarations: [
        NotepadAppComponent
    ],
    imports: [
        SharedModule,
        AboutWindowModule,
        DocumentCreationWindowModule,
        DocumentDownloaderWindowModule,
        EditorModule,
        FontWindowModule,
        MenuBarModule
    ]
})
export class NotepadAppModule {}
