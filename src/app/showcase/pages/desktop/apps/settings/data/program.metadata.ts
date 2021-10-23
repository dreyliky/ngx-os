import { AppMetadata } from '../../../features/exec';
import { SettingsAppComponent } from '../settings.component';

export const SETTINGS_APP: AppMetadata = {
    componentRef: () => SettingsAppComponent,
    shortcutParams: {
        label: 'Settings',
        iconUrl: 'assets/showcase/icons/settings.png'
    },
    windowParams: {
        title: 'Settings',
        iconUrl: 'assets/showcase/icons/settings.png',
        minWidth: 700,
        minHeight: 400
    }
};
