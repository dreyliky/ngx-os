import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import * as Prism from 'prismjs';

interface LanguageInfo {
    definition: Prism.Grammar;
    name: any;
}

@Component({
    selector: 'api-code',
    templateUrl: './code.component.html',
    styleUrls: ['./code.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CodeComponent implements OnChanges {
    @Input()
    public readonly language: string;

    @Input()
    public readonly code: string;

    public parsedResult: string;

    private readonly languagesMap = new Map<string, LanguageInfo>()
        .set(
            'html',
            {
                definition: Prism.languages.html,
                name: 'html'
            }
        )
        .set(
            'css',
            {
                definition: Prism.languages.css,
                name: 'css'
            }
        )
        .set(
            'ts',
            {
                definition: Prism.languages.js,
                name: 'js'
            }
        );

    public ngOnChanges(): void {
        const { name, definition } = this.languagesMap.get(this.language);
        this.parsedResult = Prism.highlight(this.code, definition, name);
    }
}
