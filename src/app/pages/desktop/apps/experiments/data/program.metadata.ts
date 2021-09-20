import { AppMetadata } from '../../../features/exec';
import { ExperimentsAppComponent } from '../experiments.component';

export const EXPERIMENTS_APP: AppMetadata = {
    component: ExperimentsAppComponent,
    shortcutParams: {
        label: 'Experiments',
        iconUrl: 'assets/icons/bug.png'
    },
    windowParams: {
        title: 'Experiments',
        iconUrl: 'assets/icons/bug.png',
        isAlwaysOnTop: true,
        minWidth: 500,
        minHeight: 475
    }
};