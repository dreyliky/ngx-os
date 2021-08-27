import { AppMetadata } from '@Doc/pages/desktop/features/exec';
import { ShutDownAppComponent } from '../shut-down.component';

export const SHUT_DOWN_APP: AppMetadata = {
    component: ShutDownAppComponent,
    shortcutParams: {
        label: 'Shut Down',
        iconUrl: 'assets/icons/shutdown.png'
    },
    windowParams: {
        title: 'Shut Down (GO TO DOCUMENTATION)',
        iconUrl: 'assets/icons/shutdown.png',
        isTitleBarVisible: false,
        isFullscreen: true
    }
};
