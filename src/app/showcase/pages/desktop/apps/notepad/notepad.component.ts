import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { DynamicWindowRef, DYNAMIC_WINDOW_REF } from 'ngx-os';
import { TextDocument } from '../../features/file-system';
import { NOTEPAD_PROVIDERS } from './notepad-providers.array';
import { OpenedDocumentState } from './states';

@Component({
    selector: 'notepad-app',
    templateUrl: './notepad.component.html',
    styleUrls: ['./notepad.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: NOTEPAD_PROVIDERS
})
export class NotepadAppComponent implements OnInit {
    constructor(
        @Inject(DYNAMIC_WINDOW_REF) private readonly windowRef: DynamicWindowRef,
        private readonly openedDocumentState: OpenedDocumentState
    ) {}

    public ngOnInit(): void {
        this.initOpenedDocumentState();
        this.initDynamicWindowTitle();
    }

    private initOpenedDocumentState(): void {
        const openedDocument = this.windowRef.config.data as TextDocument;

        if (openedDocument) {
            this.openedDocumentState.set(openedDocument);
        }
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
