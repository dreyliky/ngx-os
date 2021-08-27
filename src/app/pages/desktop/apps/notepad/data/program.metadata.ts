import { AppMetadata } from '../../../features/exec';
import { NotepadAppComponent } from '../notepad.component';

export const NOTEPAD_APP: AppMetadata = {
    component: NotepadAppComponent,
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
