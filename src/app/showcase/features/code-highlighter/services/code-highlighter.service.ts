import { Injectable } from '@angular/core';
import type PrismJS from 'prismjs';
import { CodeLanguageInfo } from '../interfaces';
import { CodeLanguageType } from '../types';

declare const Prism: typeof PrismJS;

@Injectable({
    providedIn: 'root'
})
export class CodeHighlighterService {
    private readonly languagesMap = new Map<CodeLanguageType, CodeLanguageInfo>()
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
            'js',
            {
                definition: Prism.languages.javascript,
                name: 'javascript'
            }
        )
        .set(
            'ts',
            {
                definition: Prism.languages.typescript,
                name: 'typescript'
            }
        );

    /** Returns HTML as highlighted code */
    public highlight(language: CodeLanguageType, rawCode: string): string {
        const { name, definition } = this.languagesMap.get(language);

        return Prism.highlight(rawCode, definition, name);
    }
}
