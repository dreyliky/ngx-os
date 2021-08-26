import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DynamicWindowService, GridItem } from '@lib-modules';
import { OverviewAppComponent } from './apps/overview';

@Component({
    selector: 'demo-desktop-page',
    templateUrl: './desktop.component.html',
    styleUrls: ['./desktop.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DesktopComponent implements OnInit {
    public shortcuts: GridItem[] = [
        {
            label: 'Os Elements',
            iconUrl: 'assets/icons/my-pc.png',
            onDblClick: () => this.onOsElementsShortcutDblClick()
        }
    ];

    constructor(
        private readonly windowService: DynamicWindowService
    ) {}

    public ngOnInit(): void {
        this.onOsElementsShortcutDblClick();
    }

    public trackByFn = (_: GridItem, index: number): number => {
        return index;
    }

    private onOsElementsShortcutDblClick(): void {
        this.windowService.open(
            OverviewAppComponent,
            {
                title: 'Angular OS - components overview',
                minWidth: 700,
                minHeight: 500
            }
        );
    }
}
