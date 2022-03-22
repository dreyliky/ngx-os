import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { FileReaderService } from '@core/services';
import { DynamicWindowService } from 'ngx-os';
import { DocumentEventService } from '../../../events';
import {
    DocumentCreationWindowComponent,
    DOCUMENT_CREATION_WINDOW_CONFIG
} from '../../document-creation-window';
import {
    DocumentDownloaderWindowComponent,
    DOCUMENT_DOWNLOADER_WINDOW_CONFIG
} from '../../document-downloader-window';

@Component({
    selector: 'notepad-menu-bar-file',
    templateUrl: './file-bar.component.html',
    styleUrls: ['./file-bar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        DynamicWindowService
    ]
})
export class FileBarComponent {
    @ViewChild('fileUploader', { static: false })
    private readonly fileUploader: ElementRef<HTMLInputElement>;

    constructor(
        private readonly fileReader: FileReaderService,
        private readonly documentEventService: DocumentEventService,
        private readonly windowService: DynamicWindowService
    ) {}

    public onUploadButtonClick(): void {
        this.fileUploader.nativeElement.click();
    }

    public onFileUpload(event: Event): void {
        const inputElement = event.target as HTMLInputElement;
        const uploadedFile = inputElement.files[0];

        if (uploadedFile) {
            this.uploadFile(uploadedFile);
        }
    }

    public onSaveButtonClick(): void {
        this.windowService.open(
            DocumentCreationWindowComponent,
            DOCUMENT_CREATION_WINDOW_CONFIG
        );
    }

    public onDownloadButtonClick(): void {
        this.windowService.open(
            DocumentDownloaderWindowComponent,
            DOCUMENT_DOWNLOADER_WINDOW_CONFIG
        );
    }

    private uploadFile(file: File): void {
        this.fileReader.readAsText(file, (data) => {
            this.documentEventService.emitOnDocumentUploaded({
                name: file.name,
                data
            });
        });
    }
}
