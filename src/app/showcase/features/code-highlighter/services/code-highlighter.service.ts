import { Injectable } from '@angular/core';
import type * as PrismJS from 'prismjs';
import { LANGUAGES_MAP } from '../data';
import { CodeLanguageType } from '../types';

declare const Prism: typeof PrismJS;

@Injectable({
    providedIn: 'root'
})
export class CodeHighlighterService {
    /** Returns HTML as highlighted code */
    public highlight(language: CodeLanguageType, rawCode: string): string {
        const { name, definition } = LANGUAGES_MAP.get(language);

        return Prism.highlight(rawCode, definition, name);
    }
}
