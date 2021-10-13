import { Injectable } from '@angular/core';
import { ThemeRgbColor } from 'ngx-os';
import { BackgroundService, BackgroundTypeEnum } from '../../../../../features/background';

@Injectable()
export class BackgroundControlService {
    constructor(
        private readonly backgroundService: BackgroundService
    ) {}

    public applyImage(imageUrl: string): void {
        this.backgroundService.apply({
            type: BackgroundTypeEnum.Image,
            data: imageUrl
        });
    }

    public applyCustom(imageBase64: string): void {
        this.backgroundService.apply({
            type: BackgroundTypeEnum.CustomImage,
            data: imageBase64
        });
    }

    public applyColor(color: ThemeRgbColor): void {
        this.backgroundService.apply({
            type: BackgroundTypeEnum.Color,
            data: color
        });
    }
}
