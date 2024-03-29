import { AppMetadata } from '../../../features/exec';
import { NotepadAppComponent } from '../notepad.component';

export const NOTEPAD_APP: AppMetadata = {
    componentRef: () => NotepadAppComponent,
    shortcutParams: {
        label: 'Notepad',
        iconUrl: 'assets/showcase/icons/notepad.png'
    },
    windowParams: {
        title: 'Notepad',
        iconUrl: 'assets/showcase/icons/notepad.png',
        minWidth: 300,
        minHeight: 150,
        width: 640,
        height: 350
    }
};
