import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DynamicWindowRef, DYNAMIC_WINDOW_REF } from 'ngx-os';
import { TextDocumentsService } from '../../../../features/file-system';
import { EditorService } from '../../services';

@Component({
    selector: 'notepad-document-creation-window',
    templateUrl: './document-creation-window.component.html',
    styleUrls: ['./document-creation-window.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentCreationWindowComponent {
    public fileNameControl = new FormControl('My File');

    constructor(
        @Inject(DYNAMIC_WINDOW_REF) private readonly windowRef: DynamicWindowRef,
        private readonly editorService: EditorService,
        private readonly textDocumentsService: TextDocumentsService
    ) {}

    public onSaveButtonClick(): void {
        if (this.fileNameControl.valid) {
            this.saveTextDocument();
            this.windowRef.close(this.fileNameControl.value);
        }
    }

    public onCancelButtonClick(): void {
        this.windowRef.close();
    }

    private saveTextDocument(): void {
        this.textDocumentsService.create({
            name: this.fileNameControl.value,
            data: this.editorService.data
        });
    }
}
