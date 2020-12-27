import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'demo-button-overview',
    templateUrl: './button-overview.component.html',
    styleUrls: ['./button-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonOverviewComponent implements OnInit {

    public counter: number = 0;

    constructor() {}

    public ngOnInit(): void {}

    public onIncreaseButtonClick(): void {
        this.counter++;
    }

    public onDecreaseButtonClick(): void {
        this.counter--;
    }

}
