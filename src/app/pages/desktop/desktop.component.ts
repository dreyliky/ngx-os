import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DynamicWindowService, GridItem } from '@lib-modules';
import { OverviewAppComponent } from './apps/overview';
import { SettingsAppComponent } from './apps/settings';

@Component({
    selector: 'demo-desktop-page',
    templateUrl: './desktop.component.html',
    styleUrls: ['./desktop.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DesktopComponent implements OnInit {
    public shortcuts: GridItem[] = [
        {
            label: 'Overview',
            iconUrl: 'assets/icons/my-pc.png',
            onDblClick: () => this.onOverviewShortcutDblClick()
        },
        {
            label: 'Settings',
            iconUrl: 'assets/icons/settings.png',
            onDblClick: () => this.onSettingsShortcutDblClick()
        }
    ];

    constructor(
        private readonly windowService: DynamicWindowService
    ) {}

    public ngOnInit(): void {
        this.onSettingsShortcutDblClick();
    }

    public trackByFn = (_: GridItem, index: number): number => {
        return index;
    }

    private onOverviewShortcutDblClick(): void {
        this.windowService.open(
            OverviewAppComponent,
            {
                title: 'Angular OS - components overview',
                minWidth: 400,
                minHeight: 500
            }
        );
    }

    private onSettingsShortcutDblClick(): void {
        this.windowService.open(
            SettingsAppComponent,
            {
                title: 'Settings',
                minWidth: 700,
                minHeight: 400
            }
        );
    }
}
