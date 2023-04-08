import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MenuBarComponent } from 'ngx-os';

@Component({
    selector: 'showcase-menu-bar-usage-by-view-child',
    templateUrl: './menu-bar-usage-by-view-child.component.html',
    styleUrls: ['./menu-bar-usage-by-view-child.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuBarUsageByViewChildComponent {
    @ViewChild(MenuBarComponent)
    private readonly menuBar: MenuBarComponent;

    public onThirdMenuBarItemClick(): void {
        setTimeout(() => {
            this.menuBar.close();
        }, 1000);
    }
}
