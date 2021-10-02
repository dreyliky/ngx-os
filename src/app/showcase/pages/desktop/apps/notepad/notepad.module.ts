import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { NotepadAppComponent } from './notepad.component';

@NgModule({
    declarations: [
        NotepadAppComponent
    ],
    imports: [
        SharedModule
    ]
})
export class NotepadAppModule {}
