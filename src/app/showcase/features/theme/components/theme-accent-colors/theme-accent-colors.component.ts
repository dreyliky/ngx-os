import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ThemeRgbColor } from 'ngx-os';
import { ACCENT_COLORS } from '../../data';

@Component({
    selector: 'theme-accent-colors',
    templateUrl: './theme-accent-colors.component.html',
    styleUrls: ['./theme-accent-colors.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeAccentColorsComponent {
    @Input()
    public readonly selectedColor: ThemeRgbColor;

    @Output()
    public accentColorClick = new EventEmitter<ThemeRgbColor>();

    public readonly accentColors = ACCENT_COLORS;

    public isAccentColorSelected({ r, g, b }: ThemeRgbColor): boolean {
        return (
            r === this.selectedColor?.r &&
            g === this.selectedColor?.g &&
            b === this.selectedColor?.b
        );
    }

    public transformAccentColorToCssFormat({ r, g, b }: ThemeRgbColor): string {
        return `rgb(${r}, ${g}, ${b})`;
    }
}
