import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IDropdownValueChangeEvent } from '@lib-modules';
import { THEMES } from '../../data';
import { Theme } from '../../interfaces';

@Component({
    selector: 'theme-dropdown',
    templateUrl: './theme-dropdown.component.html',
    styleUrls: ['./theme-dropdown.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeDropdownComponent {
    @Input()
    public readonly selectedTheme: Theme;

    @Output()
    public themeChanged = new EventEmitter<Theme>();

    public readonly themes = THEMES;

    public onThemeChanged(event: IDropdownValueChangeEvent<Theme>): void {
        const theme = event.value;

        this.themeChanged.emit(theme);
    }
}
