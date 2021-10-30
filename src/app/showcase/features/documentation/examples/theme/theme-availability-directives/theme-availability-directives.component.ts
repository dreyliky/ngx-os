import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ThemeEnum } from '@features/theme';

interface DemoItem {
    label: string;
    themes: ThemeEnum[];
}

@Component({
    selector: 'showcase-theme-availability-directives',
    templateUrl: './theme-availability-directives.component.html',
    styleUrls: ['./theme-availability-directives.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeAvailabilityDirectivesComponent {
    public readonly demoItems: DemoItem[] = [
        {
            label: 'Windows 10',
            themes: [ThemeEnum.Win10]
        },
        {
            label: 'Windows XP',
            themes: [ThemeEnum.WinXP]
        },
        {
            label: 'Windows 98',
            themes: [ThemeEnum.Win98]
        },
        {
            label: 'Windows 10 & Windows XP',
            themes: [ThemeEnum.Win10, ThemeEnum.WinXP]
        }
    ];
}
