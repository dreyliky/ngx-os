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
import { takeUntil } from 'rxjs/operators';
import { TextDocument } from '../../../../features/file-system';
import { DocumentEventService } from '../../events';
import { Settings } from '../../interfaces';
import { EditorSelectionService, EditorService, SettingsService } from '../../services';

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

    constructor(
        @Inject(DYNAMIC_WINDOW_REF) private readonly windowRef: DynamicWindowRef,
        @Inject(DOCUMENT) private readonly document: Document,
        private readonly editorService: EditorService,
        private readonly editorSelectionService: EditorSelectionService,
        private readonly documentEventService: DocumentEventService,
        private readonly settingsService: SettingsService,
        private readonly changeDetector: ChangeDetectorRef
    ) {
        super();
    }

    public ngOnInit(): void {
        this.initEditorPastEventObserver();
        this.initDocumentUploadedEventObserver();
        this.initSettingsObserver();
    }

    public ngAfterViewInit(): void {
        this.initDefaultContent();
        this.editorElementRef.nativeElement.focus();
    }

    public onEditorInputEvent(event: Event): void {
        const target = event.target as HTMLDivElement;

        this.editorService.set(target.innerText);
    }

    public onEditorPasteEvent(event: ClipboardEvent): void {
        const text = event.clipboardData.getData('text');

        this.editorSelectionService.delete();
        this.pastContentAtCursorPosition(text);
        event.preventDefault();
    }

    private initDefaultContent(): void {
        const textDocument = this.windowRef.config.data as TextDocument;
        const initialValue = textDocument?.data ?? '';

        this.applyContent(initialValue);
    }

    private applyContent(content: string): void {
        this.editorElementRef.nativeElement.innerText = content;

        this.editorService.set(content);
    }

    private pastContentAtCursorPosition(content: string): void {
        const selection = window.getSelection();
        const contentAsNode = this.document.createElement('div');
        contentAsNode.innerText = content;

        selection.getRangeAt(0).insertNode(contentAsNode);
        selection.collapseToEnd();
    }

    private initEditorPastEventObserver(): void {
        this.editorService.onPast$
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe((data) => this.pastContentAtCursorPosition(data));
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
