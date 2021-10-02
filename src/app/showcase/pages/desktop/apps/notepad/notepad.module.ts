import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';
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
