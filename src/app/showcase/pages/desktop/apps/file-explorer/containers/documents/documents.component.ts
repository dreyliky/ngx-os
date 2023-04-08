import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ExecService } from '../../../../features/exec';
import { TextDocument, TextDocumentsService } from '../../../../features/file-system';
import { NOTEPAD_APP } from '../../../notepad';

@Component({
    selector: 'file-explorer-documents-section',
    templateUrl: './documents.component.html',
    styleUrls: ['./documents.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentsComponent implements OnInit {
    public documents$: Observable<TextDocument[]>;

    constructor(
        private readonly textDocumentsService: TextDocumentsService,
        private readonly execService: ExecService
    ) {}

    public ngOnInit(): void {
        this.documents$ = this.textDocumentsService.data$;
    }

    public onDocumentEdit(document: TextDocument): void {
        this.execService.run(NOTEPAD_APP, document);
    }

    public onDocumentDeleteButtonClick(document: TextDocument): void {
        this.textDocumentsService.delete(document);
    }

    public onCreateDocumentButtonClick(): void {
        this.execService.run(NOTEPAD_APP);
    }
}
