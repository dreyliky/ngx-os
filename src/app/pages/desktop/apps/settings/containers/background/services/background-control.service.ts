import { Injectable } from '@angular/core';
import { BackgroundService } from '@Doc/pages/desktop/features/background';
import { BackgroundTypeEnum } from '@Doc/pages/desktop/features/background/enums';
import { IThemeRgbColor } from '@lib-modules';

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

    public applyColor(color: IThemeRgbColor): void {
        this.backgroundService.apply({
            type: BackgroundTypeEnum.Color,
            data: color
        });
    }
}
