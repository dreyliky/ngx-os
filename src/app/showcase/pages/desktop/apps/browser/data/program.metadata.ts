import { AppMetadata } from '../../../features/exec';
import { BrowserAppComponent } from '../browser.component';

export const BROWSER_APP: AppMetadata = {
    componentRef: () => BrowserAppComponent,
    shortcutParams: {
        label: 'Browser',
        iconUrl: 'assets/showcase/icons/browser.png'
    },
    windowParams: {
        title: 'Browser',
        iconUrl: 'assets/showcase/icons/browser.png',
        minWidth: 640,
        minHeight: 480
    }
};
