import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DEFAULT_TEXT_DOCUMENTS } from '../data';
import { TextDocument } from '../interfaces';
import { TextDocumentsState } from '../states';

@Injectable()
export class TextDocumentsService {
    public get data$(): Observable<TextDocument[]> {
        return this.state.data$;
    }

    public get data(): TextDocument[] {
        return this.state.data;
    }

    constructor(
        private readonly state: TextDocumentsState
    ) {
        this.init();
    }

    public create(document: TextDocument): void {
        this.state.pushItem(document);
    }

    public delete(document: TextDocument): void {
        this.state.removeItem(document);
    }

    private init(): void {
        this.state.set(DEFAULT_TEXT_DOCUMENTS);
    }
}
