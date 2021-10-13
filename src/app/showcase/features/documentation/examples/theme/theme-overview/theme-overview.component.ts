import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ThemeEnum } from '@features/theme';
import { ThemeService } from 'ngx-os';
import { Observable } from 'rxjs';

@Component({
    selector: 'showcase-theme-overview',
    templateUrl: './theme-overview.component.html',
    styleUrls: ['./theme-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeOverviewComponent implements OnInit {
    public readonly themes: ThemeEnum[] = [
        ThemeEnum.Win98,
        ThemeEnum.WinXP,
        ThemeEnum.Win10
    ];

    public appliedTheme$: Observable<ThemeEnum>;

    constructor(
        private readonly themeService: ThemeService<ThemeEnum>
    ) {}

    public ngOnInit(): void {
        this.appliedTheme$ = this.themeService.applied$;
    }

    public applyTheme(themeName: ThemeEnum): void {
        this.themeService.apply(themeName);
    }
}
