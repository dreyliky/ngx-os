import { Injectable } from '@angular/core';
import { IThemeRgbColor } from '@lib-modules';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BackgroundService, BackgroundTypeEnum } from '../features/background';

@Injectable()
export class DesktopBackgroundService {
    public get styles$(): Observable<string> {
        return this.backgroundService.data$
            .pipe(
                map(({ type, data }) => {
                    if (type === BackgroundTypeEnum.Color) {
                        const { r, g, b } = data as IThemeRgbColor;

                        return `rgb(${r}, ${g}, ${b})`;
                    }

                    return `url(${data})`;
                })
            );
    }

    constructor(
        private readonly backgroundService: BackgroundService
    ) {}
}
