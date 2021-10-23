import { AppMetadata } from '../../../features/exec';
import { ExperimentsAppComponent } from '../experiments.component';

export const EXPERIMENTS_APP: AppMetadata = {
    componentRef: () => ExperimentsAppComponent,
    shortcutParams: {
        label: 'Experiments with dynamic windows',
        iconUrl: 'assets/showcase/icons/bug.png'
    },
    windowParams: {
        title: 'Experiments with dynamic windows',
        iconUrl: 'assets/showcase/icons/bug.png',
        isAlwaysOnTop: true,
        minWidth: 500,
        minHeight: 475
    }
};
