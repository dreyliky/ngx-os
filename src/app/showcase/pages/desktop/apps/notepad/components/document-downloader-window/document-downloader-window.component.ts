import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { FileDownloaderService } from '@core/services';
import { DynamicWindowRef, DYNAMIC_WINDOW_REF } from 'ngx-os';
import { EditorService } from '../../services';
import { OpenedDocumentState } from '../../states';

@Component({
    selector: 'notepad-document-downloader-window',
    templateUrl: './document-downloader-window.component.html',
    styleUrls: ['./document-downloader-window.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentDownloaderWindowComponent implements OnInit {
    public fileNameControl = new UntypedFormControl();

    constructor(
        @Inject(DYNAMIC_WINDOW_REF) private readonly windowRef: DynamicWindowRef,
        private readonly openedDocumentState: OpenedDocumentState,
        private readonly editorService: EditorService,
        private readonly fileDownloader: FileDownloaderService
    ) {}

    public ngOnInit(): void {
        this.initFileNameControlDefaultValue();
    }

    public onDownloadButtonClick(): void {
        if (this.fileNameControl.valid) {
            this.downloadTextDocument();
            this.windowRef.close(this.fileNameControl.value);
        }
    }

    public onCancelButtonClick(): void {
        this.windowRef.close();
    }

    private downloadTextDocument(): void {
        const blob = new Blob([this.editorService.data]);
        const name = this.fileNameControl.value;

        this.fileDownloader.download(blob, name, 'txt');
    }

    private initFileNameControlDefaultValue(): void {
        const defaultName = 'My File';
        const openedDocument = this.openedDocumentState.data;
        const initialName = (openedDocument?.name ?? defaultName);

        this.fileNameControl.setValue(initialName);
    }
}
