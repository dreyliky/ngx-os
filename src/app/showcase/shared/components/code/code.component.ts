import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { Grammar } from 'prismjs';
import 'prismjs/components/prism-scss.min';
import 'prismjs/components/prism-typescript.min';

declare const Prism: any;

interface LanguageInfo {
    definition: Grammar;
    name: string;
}

@Component({
    selector: 'showcase-code',
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
            'scss',
            {
                definition: Prism.languages.scss,
                name: 'scss'
            }
        )
        .set(
            'ts',
            {
                definition: Prism.languages.typescript,
                name: 'typescript'
            }
        );

    public ngOnChanges(): void {
        const { name, definition } = this.languagesMap.get(this.language);
        this.parsedResult = Prism.highlight(this.code, definition, name);
    }
}
