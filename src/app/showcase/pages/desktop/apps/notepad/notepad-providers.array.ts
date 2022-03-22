import { DocumentEventService } from './events';
import {
    EditorHistoryService,
    EditorSelectionService,
    EditorService,
    SettingsService
} from './services';
import {
    EditorFutureHistoryState,
    EditorPastHistoryState,
    EditorState,
    OpenedDocumentState
} from './states';

export const NOTEPAD_PROVIDERS = [
    EditorService,
    EditorSelectionService,
    EditorHistoryService,
    EditorState,
    EditorPastHistoryState,
    EditorFutureHistoryState,
    DocumentEventService,
    OpenedDocumentState,
    SettingsService
];
