import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ThemeEnum } from '@features/theme';
import { ThemeService } from 'ngx-os/modules';
import { Observable } from 'rxjs';

@Component({
    selector: 'showcase-theme-different-styling',
    templateUrl: './theme-different-styling.component.html',
    styleUrls: ['./theme-different-styling.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeDifferentStylingComponent implements OnInit {
    public appliedTheme$: Observable<ThemeEnum>;

    constructor(
        private readonly themeService: ThemeService<ThemeEnum>
    ) {}

    public ngOnInit(): void {
        this.appliedTheme$ = this.themeService.applied$;
    }
}
