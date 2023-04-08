import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { DocumentCreationWindowComponent } from './document-creation-window.component';

@NgModule({
    declarations: [
        DocumentCreationWindowComponent
    ],
    imports: [
        SharedModule
    ]
})
export class DocumentCreationWindowModule {}
