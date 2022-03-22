import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, OnDestroy } from '@angular/core';
import { ClipboardService } from '@core/services';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EditorService } from './editor.service';

@Injectable()
export class EditorSelectionService implements OnDestroy {
    public get isEmpty(): boolean {
        return !this.dataAsString;
    }

    public get data(): Selection {
        return this.document.getSelection();
    }

    public get dataAsString(): string {
        return this.data.toString();
    }

    public get onSelectAll$(): Observable<void> {
        return this._onSelectAll$.asObservable();
    }

    private readonly _onSelectAll$ = new Subject<void>();
    private readonly destroyed$ = new Subject<boolean>();

    constructor(
        @Inject(DOCUMENT) private readonly document: Document,
        private readonly editorService: EditorService,
        private readonly clipboardService: ClipboardService
    ) {}

    public ngOnDestroy(): void {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }

    public selectAll(): void {
        this._onSelectAll$.next();
    }

    public cut(): void {
        this.copy();
        this.delete();
    }

    public copy(): void {
        this.clipboardService.write(this.dataAsString)
            .pipe(takeUntil(this.destroyed$))
            .subscribe();
    }

    public pasteFromClipboard(): void {
        this.clipboardService.read()
            .pipe(takeUntil(this.destroyed$))
            .subscribe((data) => this.editorService.paste(data));
    }

    public delete(): void {
        this.data.deleteFromDocument();
    }
}
