import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DynamicWindowService, GridItem } from '@lib-modules';
import { NotepadComponent } from './apps/notepad';
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
            label: 'Notepad',
            iconUrl: 'assets/icons/notepad.png',
            onDblClick: () => this.onNotepadShortcutDblClick()
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
                iconUrl: 'assets/icons/my-pc.png',
                minWidth: 400,
                minHeight: 500
            }
        );
    }

    private onNotepadShortcutDblClick(): void {
        this.windowService.open(
            NotepadComponent,
            {
                title: 'Notepad',
                iconUrl: 'assets/icons/notepad.png',
                minWidth: 700,
                minHeight: 400
            }
        );
    }

    private onSettingsShortcutDblClick(): void {
        this.windowService.open(
            SettingsAppComponent,
            {
                title: 'Settings',
                iconUrl: 'assets/icons/settings.png',
                minWidth: 700,
                minHeight: 400
            }
        );
    }
}
