import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';

/** @internal */
interface Item {
    name: string;
    value: number;
}

/** @internal */
@Component({
    selector: 'demo-dropdown-with-interval-value-change',
    templateUrl: './dropdown-with-interval-value-change.component.html',
    styleUrls: ['./dropdown-with-interval-value-change.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownWithIntervalValueChangeComponent {
    public selectedItem: Item;

    public items: Item[] = [
        {
            value: 0,
            name: 'Item #0'
        }
    ];

    public get _currentIntervalStateLabel(): string {
        return (this.intervalId) ? 'ON' : 'OFF';
    }

    private intervalId: number;

    constructor(
        private readonly changeDetector: ChangeDetectorRef
    ) {}

    public onToggleIntervalButtonClick(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        } else {
            this.runInterval();
        }
    }

    private runInterval(): void {
        this.intervalId = setInterval(() => {
            this.selectedItem = (this.selectedItem) ? null : this.items[0];

            this.changeDetector.detectChanges();
        }, 1000);
    }
}
