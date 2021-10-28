import { AppMetadata } from '../../../features/exec';
import { ImageViewerAppComponent } from '../image-viewer.component';

export const IMAGE_VIEWER_APP: AppMetadata = {
    componentRef: () => ImageViewerAppComponent,
    shortcutParams: {
        label: 'Photo Viewer',
        iconUrl: 'assets/showcase/icons/image.png'
    },
    windowParams: {
        title: 'Photo Viewer',
        iconUrl: 'assets/showcase/icons/image.png',
        minWidth: 440,
        minHeight: 280,
        isFullscreenByDefault: true
    }
};
