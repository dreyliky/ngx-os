import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'showcase-utils-fixed-to-parent-overview',
    templateUrl: './utils-fixed-to-parent-overview.component.html',
    styleUrls: ['./utils-fixed-to-parent-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UtilsFixedToParentOverviewComponent {
    public readonly myDropdownItems = [
        'Item #1',
        'Item #2',
        'Item #3'
    ];

    public selectedItem: string;
    public isOverlayVisible = false;

    public onMyDropdownButtonClick(): void {
        this.isOverlayVisible = !this.isOverlayVisible;
    }

    public onMyDropdownItemClick(item: string): void {
        this.selectedItem = item;
        this.isOverlayVisible = false;
    }
}
