import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OsBaseComponent } from 'os-angular/core';

@Component({
    selector: 'os-slider',
    templateUrl: './slider.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderComponent extends OsBaseComponent {

    @Input()
    public label: string;

    @Input()
    public minValueLabel: string;

    @Input()
    public maxValueLabel: string;

    @Input()
    public isDisabled: boolean;

    @Input()
    public min: number = 0;

    @Input()
    public max: number = 100;

    @Input()
    public value: number = 0;

    constructor() {
        super();
    }

}
