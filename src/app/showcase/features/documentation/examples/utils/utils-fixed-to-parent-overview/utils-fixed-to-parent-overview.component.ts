import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';

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
    public isFixedToParentEnabled = true;
    public isOverlayVisible = false;

    @HostListener('document:click')
    public onClickOutside(): void {
        this.isOverlayVisible = false;
    }

    public onMyDropdownButtonClick(event: MouseEvent): void {
        this.isOverlayVisible = !this.isOverlayVisible;

        event.stopPropagation();
    }

    public onMyDropdownItemClick(item: string): void {
        this.selectedItem = item;
        this.isOverlayVisible = false;
    }
}
