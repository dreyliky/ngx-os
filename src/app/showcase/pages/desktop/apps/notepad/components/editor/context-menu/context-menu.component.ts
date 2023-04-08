import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ClipboardService } from '@core/services';
import { ɵOsBaseViewComponent } from 'ngx-os';
import { takeUntil } from 'rxjs/operators';
import { EditorSelectionService } from '../../../services';

@Component({
    selector: 'notepad-editor-context-menu',
    templateUrl: './context-menu.component.html',
    styleUrls: ['./context-menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContextMenuComponent extends ɵOsBaseViewComponent implements OnInit {
    public clipboardData!: string;

    public get isSelectionEmpty(): boolean {
        return this.editorSelectionService.isEmpty;
    }

    public get isPasteButtonDisabled(): boolean {
        return !this.clipboardData;
    }

    constructor(
        private readonly editorSelectionService: EditorSelectionService,
        private readonly clipboardService: ClipboardService,
        private readonly changeDetector: ChangeDetectorRef
    ) {
        super();
    }

    public ngOnInit(): void {
        this.initClipboardData();
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

    private initClipboardData(): void {
        this.clipboardService.read()
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe((data) => {
                this.clipboardData = data;

                this.changeDetector.detectChanges();
            });
    }
}
