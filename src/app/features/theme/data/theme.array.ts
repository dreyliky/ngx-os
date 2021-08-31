import { ThemeEnum } from '@lib-modules';
import { Theme } from '../interfaces';

export const THEMES: Theme[] = [
    {
        name: 'Windows 98',
        cssName: ThemeEnum.Win98
    },
    {
        name: 'Windows XP',
        cssName: ThemeEnum.WinXP
    },
    {
        name: 'Windows 10',
        cssName: ThemeEnum.Win10
    }
];
