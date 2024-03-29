import { AppMetadata } from '../../../features/exec';
import { OverviewAppComponent } from '../overview.component';

export const OVERVIEW_APP: AppMetadata = {
    componentRef: () => OverviewAppComponent,
    shortcutParams: {
        label: 'Overview',
        iconUrl: 'assets/showcase/icons/my-pc.png'
    },
    windowParams: {
        title: 'Angular OS - components overview',
        iconUrl: 'assets/showcase/icons/my-pc.png',
        minWidth: 300,
        minHeight: 175,
        width: 400,
        height: 500
    }
};
