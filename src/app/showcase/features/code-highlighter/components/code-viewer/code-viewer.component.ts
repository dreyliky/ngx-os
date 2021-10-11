import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { CodeHighlighterService } from '../../services';
import { CodeLanguageType } from '../../types';

@Component({
    selector: 'showcase-code-viewer',
    templateUrl: './code-viewer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CodeViewerComponent implements OnChanges {
    @Input()
    public readonly language: CodeLanguageType;

    @Input()
    public readonly code: string;

    public parsedResult: string;

    constructor(
        private readonly highlighter: CodeHighlighterService
    ) {}

    public ngOnChanges(): void {
        this.parsedResult = this.highlighter.highlight(this.language, this.code);
    }
}
