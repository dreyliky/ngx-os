import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IThemeRgbColor } from 'ngx-os/modules';
import { ACCENT_COLORS } from '../../data';

@Component({
    selector: 'theme-accent-colors',
    templateUrl: './theme-accent-colors.component.html',
    styleUrls: ['./theme-accent-colors.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeAccentColorsComponent {
    @Input()
    public readonly selectedColor: IThemeRgbColor;

    @Output()
    public accentColorClick = new EventEmitter<IThemeRgbColor>();

    public readonly accentColors = ACCENT_COLORS;

    public isAccentColorSelected({ r, g, b }: IThemeRgbColor): boolean {
        return (
            r === this.selectedColor?.r &&
            g === this.selectedColor?.g &&
            b === this.selectedColor?.b
        );
    }

    public transformAccentColorToCssFormat({ r, g, b }: IThemeRgbColor): string {
        return `rgb(${r}, ${g}, ${b})`;
    }
}
