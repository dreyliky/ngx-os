import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { DocumentDownloaderWindowComponent } from './document-downloader-window.component';

@NgModule({
    declarations: [
        DocumentDownloaderWindowComponent
    ],
    imports: [
        SharedModule
    ]
})
export class DocumentDownloaderWindowModule {}
