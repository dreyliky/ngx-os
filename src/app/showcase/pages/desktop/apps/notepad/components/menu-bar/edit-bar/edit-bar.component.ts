import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ClipboardService } from '@core/services';
import { ɵGlobalEvents, ɵOsBaseViewComponent } from 'ngx-os';
import { takeUntil } from 'rxjs/operators';
import { EditorHistoryService, EditorSelectionService } from '../../../services';

@Component({
    selector: 'notepad-menu-bar-edit',
    templateUrl: './edit-bar.component.html',
    styleUrls: ['./edit-bar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditBarComponent extends ɵOsBaseViewComponent implements OnInit {
    public clipboardData!: string;
    public isSelectionEmpty = true;
    public isUndoAvailable$ = this.editorHistoryService.isUndoAvailable$;
    public isRedoAvailable$ = this.editorHistoryService.isRedoAvailable$;

    public get isPasteButtonDisabled(): boolean {
        return !this.clipboardData;
    }

    constructor(
        private readonly clipboardService: ClipboardService,
        private readonly editorHistoryService: EditorHistoryService,
        private readonly editorSelectionService: EditorSelectionService,
        private readonly globalEvents: ɵGlobalEvents,
        private readonly changeDetector: ChangeDetectorRef
    ) {
        super();
    }

    public ngOnInit(): void {
        this.initClipboardData();
        this.initDocumentSelectionObserver();
    }

    public onUndoButtonClick(): void {
        this.editorHistoryService.undo();
    }

    public onRedoButtonClick(): void {
        this.editorHistoryService.redo();
    }

    public onCutButtonClick(): void {
        this.editorSelectionService.cut();
    }

    public onCopyButtonClick(): void {
        this.editorSelectionService.copy();
    }

    public onPasteButtonClick(): void {
        this.editorSelectionService.pasteFromClipboard();
    }

    public onDeleteButtonClick(): void {
        this.editorSelectionService.delete();
    }

    public onSelectAllButtonClick(): void {
        this.editorSelectionService.selectAll();
    }

    private initDocumentSelectionObserver(): void {
        this.globalEvents.fromDocument('selectionchange')
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe(() => {
                this.isSelectionEmpty = this.editorSelectionService.isEmpty;

                this.changeDetector.detectChanges();
            });
    }

    private initClipboardData(): void {
        this.clipboardService.read()
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe((data) => {
                this.clipboardData = data;

                this.changeDetector.detectChanges();
            });
    }
}
