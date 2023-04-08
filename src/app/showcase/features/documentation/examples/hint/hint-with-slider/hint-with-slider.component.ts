import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'showcase-hint-with-slider',
    templateUrl: './hint-with-slider.component.html',
    styleUrls: ['./hint-with-slider.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HintWithSliderComponent {
    public readonly sliderMinValue = 0;
    public readonly sliderMaxValue = 10;

    public sliderValue = 2;
    public isHintEnabled = false;

    public onSliderMouseDown(): void {
        this.isHintEnabled = true;
    }

    public onSliderMouseLeave(): void {
        this.isHintEnabled = false;
    }
}
