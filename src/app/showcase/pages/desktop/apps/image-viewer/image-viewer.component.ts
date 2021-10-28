import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { DynamicWindowRef, DYNAMIC_WINDOW_REF } from 'ngx-os';
import { BackgroundService, BackgroundTypeEnum } from '../../features/background';

@Component({
    selector: 'showcase-image-viewer',
    templateUrl: './image-viewer.component.html',
    styleUrls: ['./image-viewer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageViewerAppComponent {
    public readonly imageUrl: string;

    constructor(
        @Inject(DYNAMIC_WINDOW_REF) private readonly windowRef: DynamicWindowRef,
        private readonly backgroundService: BackgroundService
    ) {
        this.imageUrl = this.windowRef.config.data;
    }

    public onSetAsBackgroundButtonClick(): void {
        this.backgroundService.apply({
            type: BackgroundTypeEnum.Image,
            data: this.imageUrl
        });
    }
}
