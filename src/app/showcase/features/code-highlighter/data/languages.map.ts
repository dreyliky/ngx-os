import type PrismJS from 'prismjs';
import { CodeLanguageInfo } from '../interfaces';
import { CodeLanguageType } from '../types';

declare const Prism: typeof PrismJS;

export const LANGUAGES_MAP = new Map<CodeLanguageType, CodeLanguageInfo>()
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
    )
    .set(
        'json',
        {
            definition: Prism.languages.json,
            name: 'json'
        }
    );
