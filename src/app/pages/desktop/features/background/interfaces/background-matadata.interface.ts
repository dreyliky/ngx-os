import { ThemeRgbColor } from '@lib-modules';
import { BackgroundTypeEnum } from '../enums';

export interface BackgroundMetadata {
    type: BackgroundTypeEnum;
    data: string | ThemeRgbColor;
}
