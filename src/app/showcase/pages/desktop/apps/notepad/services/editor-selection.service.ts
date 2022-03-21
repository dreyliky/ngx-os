import { Injectable, OnDestroy } from '@angular/core';
import { ClipboardService } from '@core/services';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EditorService } from './editor.service';

@Injectable()
export class EditorSelectionService implements OnDestroy {
    public get isSelectionEmpty(): boolean {
        return !this.selectionAsString;
    }

    public get selection(): Selection {
        return window.getSelection();
    }

    public get selectionAsString(): string {
        return this.selection.toString();
    }

    private readonly destroyed$ = new Subject<boolean>();

    constructor(
        private readonly editorService: EditorService,
        private readonly clipboardService: ClipboardService
    ) {}

    public ngOnDestroy(): void {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }

    public cut(): void {
        this.copy();
        this.delete();
    }

    public copy(): void {
        console.log(this.selectionAsString);
        this.clipboardService.write(this.selectionAsString)
            .pipe(takeUntil(this.destroyed$))
            .subscribe();
    }

    public pastFromClipboard(): void {
        this.clipboardService.read()
            .pipe(takeUntil(this.destroyed$))
            .subscribe((data) => this.editorService.past(data));
    }

    public delete(): void {
        this.selection.deleteFromDocument();
    }
}
