import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ExecService } from '../../../../features/exec';
import { IMAGE_VIEWER_APP } from '../../../image-viewer';

class RandomImage {
    private readonly apiHost = 'https://picsum.photos';
    private readonly seed = Math.random().toString();

    public getThumbImageUrl(): string {
        return `${this.apiHost}/seed/${this.seed}/80/48`;
    }

    public getImageUrl(): string {
        return `${this.apiHost}/seed/${this.seed}/${innerWidth}/${innerHeight}`;
    }
}

@Component({
    selector: 'file-explorer-pictures-section',
    templateUrl: './pictures.component.html',
    styleUrls: ['./pictures.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PicturesComponent {
    public readonly images = new Array(50)
        .fill(0)
        .map(() => new RandomImage());

    constructor(
        private readonly execService: ExecService
    ) {}

    public getImageLabel(imageIndex: number): string {
        return `Image #${imageIndex + 1}`;
    }

    public onImageDblClick(image: RandomImage): void {
        this.execService.run(IMAGE_VIEWER_APP, image.getImageUrl());
    }
}
