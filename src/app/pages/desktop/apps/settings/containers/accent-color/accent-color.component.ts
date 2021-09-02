import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AccentColorManagerService } from '@Doc/features/theme';
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
        private readonly accentColorService: AccentColorManagerService
    ) {}

    public ngOnInit(): void {
        this.selectedColor = this.accentColorService.get('primary');
    }

    public onAccentColorClick(accentColor: ThemeRgbColor): void {
        this.selectedColor = accentColor;

        this.accentColorService.apply('primary', accentColor);
    }
}
