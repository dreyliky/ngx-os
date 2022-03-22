import { DOCUMENT } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Inject,
    OnInit,
    ViewChild
} from '@angular/core';
import { DynamicWindowRef, DYNAMIC_WINDOW_REF, ɵOsBaseViewComponent } from 'ngx-os';
import { Subject } from 'rxjs';
import { debounceTime, filter, takeUntil } from 'rxjs/operators';
import { TextDocument } from '../../../../features/file-system';
import { DocumentEventService } from '../../events';
import { Settings } from '../../interfaces';
import {
    EditorHistoryService,
    EditorSelectionService,
    EditorService,
    SettingsService
} from '../../services';

@Component({
    selector: 'notepad-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorComponent extends ɵOsBaseViewComponent implements OnInit, AfterViewInit {
    @ViewChild('editor', { static: false })
    private readonly editorElementRef: ElementRef<HTMLDivElement>;

    public get cssFontSize(): string {
        return `${this.settings.fontSizeInPx}px`;
    }

    public get cssWhiteSpace(): string {
        return (this.settings.isWordWrapEnabled) ? 'normal' : 'nowrap';
    }

    public get settings(): Settings {
        return this.settingsService.data;
    }

    private _valueInput$ = new Subject<string>();

    constructor(
        @Inject(DYNAMIC_WINDOW_REF) private readonly windowRef: DynamicWindowRef,
        @Inject(DOCUMENT) private readonly document: Document,
        private readonly editorService: EditorService,
        private readonly editorHistoryService: EditorHistoryService,
        private readonly editorSelectionService: EditorSelectionService,
        private readonly documentEventService: DocumentEventService,
        private readonly settingsService: SettingsService,
        private readonly changeDetector: ChangeDetectorRef
    ) {
        super();
    }

    public ngOnInit(): void {
        this.initEditorValueObserver();
        this.initActualEditorValueStateObserver();
        this.initEditorPastEventObserver();
        this.initEditorSelectAllEventObserver();
        this.initDocumentUploadedEventObserver();
        this.initSettingsObserver();
    }

    public ngAfterViewInit(): void {
        this.initDefaultContent();
        this.editorElementRef.nativeElement.focus();
    }

    public onEditorInputEvent(event: Event): void {
        const target = event.target as HTMLDivElement;
        const value = target.innerText;

        this.editorService.set(value);
        this._valueInput$.next(value);
    }

    public onEditorPasteEvent(event: ClipboardEvent): void {
        const text = event.clipboardData.getData('text');

        this.editorSelectionService.delete();
        this.pasteContentAtCursorPosition(text);
        event.preventDefault();
    }

    private initDefaultContent(): void {
        const textDocument = this.windowRef.config.data as TextDocument;
        const initialValue = textDocument?.data ?? '';

        if (initialValue) {
            this.applyContent(initialValue);
        }
    }

    private applyContent(content: string): void {
        this.editorElementRef.nativeElement.innerText = content;

        this.editorService.set(content);
    }

    private pasteContentAtCursorPosition(content: string): void {
        const selection = window.getSelection();
        const contentAsNode = this.document.createElement('span');
        contentAsNode.innerText = content;

        selection.getRangeAt(0).insertNode(contentAsNode);
        selection.collapseToEnd();
    }

    private selectAll(): void {
        const range = this.document.createRange();
        const selection = this.editorSelectionService.data;

        range.selectNodeContents(this.editorElementRef.nativeElement);
        selection.removeAllRanges();
        selection.addRange(range);
    }

    private initEditorValueObserver(): void {
        const actionDelayForHistoryRegistrationInMs = 500;

        this._valueInput$
            .pipe(
                debounceTime(actionDelayForHistoryRegistrationInMs),
                takeUntil(this.viewDestroyed$)
            )
            .subscribe((data) => this.editorHistoryService.registerEditorState(data));
    }

    private initActualEditorValueStateObserver(): void {
        this.editorHistoryService.onActualState$
            .pipe(
                filter((data) => !!data),
                takeUntil(this.viewDestroyed$)
            )
            .subscribe((data) => this.applyContent(data));
    }

    private initEditorPastEventObserver(): void {
        this.editorService.onPaste$
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe((data) => this.pasteContentAtCursorPosition(data));
    }

    private initEditorSelectAllEventObserver(): void {
        this.editorSelectionService.onSelectAll$
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe(() => this.selectAll());
    }

    private initDocumentUploadedEventObserver(): void {
        this.documentEventService.onDocumentUploaded$
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe(({ data }) => this.applyContent(data));
    }

    private initSettingsObserver(): void {
        this.settingsService.data$
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe(() => this.changeDetector.detectChanges());
    }
}
