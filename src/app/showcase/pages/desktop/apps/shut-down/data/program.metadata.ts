import { AppMetadata } from '@Doc/pages/desktop/features/exec';
import { ShutDownAppComponent } from '../shut-down.component';

export const SHUT_DOWN_APP: AppMetadata = {
    component: ShutDownAppComponent,
    shortcutParams: {
        label: 'Shut Down',
        iconUrl: 'assets/showcase/icons/shutdown.png'
    },
    windowParams: {
        title: 'Shut Down (GO TO DOCUMENTATION)',
        iconUrl: 'assets/showcase/icons/shutdown.png',
        isTitleBarVisible: false,
        isFullscreenByDefault: true,
        fullscreenOffset: {
            top: '0px',
            bottom: '0px',
            left: '0px',
            right: '0px'
        }
    }
};
