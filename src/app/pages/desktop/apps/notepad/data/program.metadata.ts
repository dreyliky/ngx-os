import { AppMetadata } from '../../../features/exec';
import { NotepadComponent } from '../notepad.component';

export const NOTEPAD_APP: AppMetadata = {
    component: NotepadComponent,
    shortcutParams: {
        label: 'Notepad',
        iconUrl: 'assets/icons/notepad.png'
    },
    windowParams: {
        title: 'Notepad',
        iconUrl: 'assets/icons/notepad.png',
        minWidth: 700,
        minHeight: 400
    }
};
