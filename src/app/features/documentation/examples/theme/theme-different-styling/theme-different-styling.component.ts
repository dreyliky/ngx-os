import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ThemeEnum, ThemeService } from '@lib-modules';
import { Observable } from 'rxjs';

@Component({
    selector: 'demo-theme-different-styling',
    templateUrl: './theme-different-styling.component.html',
    styleUrls: ['./theme-different-styling.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeDifferentStylingComponent implements OnInit {
    public appliedTheme$: Observable<ThemeEnum>;

    constructor(
        private readonly themeService: ThemeService
    ) {}

    public ngOnInit(): void {
        this.appliedTheme$ = this.themeService.applied$;
    }
}
