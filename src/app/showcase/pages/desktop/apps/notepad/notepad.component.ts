import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { DynamicWindowRef, DYNAMIC_WINDOW_REF } from 'ngx-os';
import { TextDocument } from '../../features/file-system';
import { DocumentEventService } from './events';
import { EditorSelectionService, EditorService, SettingsService } from './services';
import { EditorState, OpenedDocumentState } from './states';

@Component({
    selector: 'notepad-app',
    templateUrl: './notepad.component.html',
    styleUrls: ['./notepad.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        EditorService,
        EditorSelectionService,
        EditorState,
        DocumentEventService,
        OpenedDocumentState,
        SettingsService
    ]
})
export class NotepadAppComponent implements OnInit {
    constructor(
        @Inject(DYNAMIC_WINDOW_REF) private readonly windowRef: DynamicWindowRef,
        private readonly openedDocumentState: OpenedDocumentState
    ) {}

    public ngOnInit(): void {
        this.openedDocumentState.set(this.windowRef.config.data);
        this.initDynamicWindowTitle();
    }

    private initDynamicWindowTitle(): void {
        const defaultTitle = this.windowRef.config.title;
        let title = defaultTitle;

        if (this.windowRef.config.data) {
            const { name } = this.windowRef.config.data as TextDocument;
            title = `${name} - ${defaultTitle}`;
        }

        this.windowRef.updateConfig({ title });
    }
}
