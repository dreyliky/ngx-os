import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BackgroundMetadata, BackgroundTypeEnum } from '@Doc/pages/desktop/features/background';
import { IThemeRgbColor } from '@lib-modules';
import { BackgroundControlService } from '../../services';

@Component({
    selector: 'background-color-selection',
    templateUrl: './color-selection.component.html',
    styleUrls: ['./color-selection.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorSelectionComponent {
    @Input()
    public readonly currentBackground: BackgroundMetadata;

    public get isCurrentBackgroundColor(): boolean {
        return (this.currentBackground.type === BackgroundTypeEnum.Color);
    }

    public get selectedBackgroundColor(): IThemeRgbColor {
        if (this.isCurrentBackgroundColor) {
            return this.currentBackground.data as IThemeRgbColor;
        }

        return null;
    }

    constructor(
        private readonly backgroundControlService: BackgroundControlService
    ) {}

    public onAccentColorClick(color: IThemeRgbColor): void {
        this.backgroundControlService.applyColor(color);
    }
}
