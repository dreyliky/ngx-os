import { AppMetadata } from '@Doc/pages/desktop/features/exec';
import { OverviewAppComponent } from '../overview.component';

export const OVERVIEW_APP: AppMetadata = {
    component: OverviewAppComponent,
    shortcutParams: {
        label: 'Overview',
        iconUrl: 'assets/icons/my-pc.png'
    },
    windowParams: {
        title: 'Angular OS - components overview',
        iconUrl: 'assets/icons/my-pc.png',
        minWidth: 400,
        minHeight: 500
    }
};
