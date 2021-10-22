import { AppMetadata } from '../../../features/exec';
import { FileExplorerAppComponent } from '../file-explorer.component';

export const FILE_EXPLORER_APP: AppMetadata = {
    component: FileExplorerAppComponent,
    shortcutParams: {
        label: 'File Explorer',
        iconUrl: 'assets/showcase/icons/file-explorer.png'
    },
    windowParams: {
        title: 'File Explorer',
        iconUrl: 'assets/showcase/icons/file-explorer.png',
        minWidth: 500,
        minHeight: 350
    }
};
