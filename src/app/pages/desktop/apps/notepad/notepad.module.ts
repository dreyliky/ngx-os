import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';
import { NotepadComponent } from './notepad.component';

@NgModule({
    declarations: [
        NotepadComponent
    ],
    imports: [
        SharedModule
    ]
})
export class NotepadAppModule {}
