import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ThemeManagerService } from '@Doc/features/theme';
import { ThemeRgbColor } from '@lib-modules';

@Component({
    selector: 'settings-accent-color-section',
    templateUrl: './accent-color.component.html',
    styleUrls: ['./accent-color.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccentColorComponent implements OnInit {
    public selectedColor: ThemeRgbColor;

    constructor(
        private readonly themeService: ThemeManagerService
    ) {}

    public ngOnInit(): void {
        this.selectedColor = this.themeService.getColor('primary');
    }

    public onAccentColorClick(accentColor: ThemeRgbColor): void {
        this.selectedColor = accentColor;

        this.themeService.applyColor('primary', accentColor);
    }
}
