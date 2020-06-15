import { ThemeEnum } from '../enums';

export const ThemeMap = new Map<ThemeEnum, () => any>()
    .set(
        ThemeEnum.Win98,
        () => {
            return require('!style-loader!css-loader!xp.css/dist/98.css');
        }
    )
    .set(
        ThemeEnum.WinXP,
        () => {
            return require('!style-loader!css-loader!xp.css/dist/XP.css');
        }
    );
