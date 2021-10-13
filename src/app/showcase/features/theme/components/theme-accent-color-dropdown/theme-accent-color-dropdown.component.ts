import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ACCENT_COLORS } from '@features/theme/data';
import { ThemeRgbColor } from 'ngx-os/modules';

interface AccentColor {
    value: ThemeRgbColor;
    css: string;
}

@Component({
    selector: 'theme-accent-color-dropdown',
    templateUrl: './theme-accent-color-dropdown.component.html',
    styleUrls: ['./theme-accent-color-dropdown.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeAccentColorDropdownComponent implements OnInit {
    @Input()
    public readonly selectedColor: ThemeRgbColor;

    @Output()
    public readonly colorChanged = new EventEmitter<ThemeRgbColor>();

    public accentColors: AccentColor[];

    public ngOnInit(): void {
        this.initAccentCssColors();
    }

    public isColorSelected({ r, g, b }: ThemeRgbColor): boolean {
        return (
            this.selectedColor?.r === r &&
            this.selectedColor?.g === g &&
            this.selectedColor?.b === b
        );
    }

    private initAccentCssColors(): void {
        this.accentColors = ACCENT_COLORS
            .map((color) => (<AccentColor>{
                value: color,
                css: `rgb(${color.r}, ${color.g}, ${color.b})`
            }));
    }
}
