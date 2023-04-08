import { Settings } from '../interfaces';
import { FONTS } from './font-settings.data';

export const DEFAULT_FONT_SETTINGS: Settings = {
    font: FONTS[0],
    fontSizeInPx: 16,
    isWordWrapEnabled: true
};
