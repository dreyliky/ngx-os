import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TextDocument } from '../../../features/file-system';

@Injectable()
export class DocumentEventService {
    public get onDocumentUploaded$(): Observable<TextDocument> {
        return this._onDocumentUploaded$.asObservable();
    }

    private readonly _onDocumentUploaded$ = new Subject<TextDocument>();

    public emitOnDocumentUploaded(document: TextDocument): void {
        this._onDocumentUploaded$.next(document);
    }
}
