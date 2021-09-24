import { AppMetadata } from '../../../features/exec';
import { SettingsAppComponent } from '../settings.component';

export const SETTINGS_APP: AppMetadata = {
    component: SettingsAppComponent,
    shortcutParams: {
        label: 'Settings',
        iconUrl: 'assets/icons/settings.png'
    },
    windowParams: {
        title: 'Settings',
        iconUrl: 'assets/icons/settings.png',
        minWidth: 700,
        minHeight: 400
    }
};
