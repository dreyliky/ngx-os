import { AppMetadata } from '../features/exec';
import { CALCULATOR_APP } from './calculator';
import { EXPERIMENTS_APP } from './experiments';
import { NOTEPAD_APP } from './notepad';
import { OVERVIEW_APP } from './overview';
import { SETTINGS_APP } from './settings';
import { SHUT_DOWN_APP } from './shut-down';

export const APPS: AppMetadata[] = [
    OVERVIEW_APP,
    NOTEPAD_APP,
    CALCULATOR_APP,
    SETTINGS_APP,
    EXPERIMENTS_APP,
    SHUT_DOWN_APP
];
