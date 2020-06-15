import { Injectable } from '@angular/core';
import { ThemeEnum } from '../enums';
import { ThemeMap } from '../data/theme.map';

@Injectable()
export class ThemeService {

    constructor () {}

    public applyTheme (theme: ThemeEnum): void {
        ThemeMap.get(theme)();
    }

}
