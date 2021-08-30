import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'demo-button-counter',
    templateUrl: './button-counter.component.html',
    styleUrls: ['./button-counter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonCounterComponent {
    public counter: number = 0;

    public onIncreaseButtonClick(): void {
        this.counter++;
    }

    public onDecreaseButtonClick(): void {
        this.counter--;
    }
}
