import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { OsBaseComponent } from 'os-angular/core';

@Component({
    selector: 'os-slider',
    templateUrl: './slider.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderComponent extends OsBaseComponent implements OnInit {

    @Input()
    public label: string;

    @Input()
    public minValueLabel: string;

    @Input()
    public maxValueLabel: string;

    @Input()
    public disabled: boolean;

    @Input()
    public isVertical: boolean = false;

    @Input()
    public min: number = 0;

    @Input()
    public max: number = 100;

    @Input()
    public value: number = 0;

    constructor () {
        super({
            elementName: 'os-slider'
        });
    }

    public ngOnInit (): void {
        super.ngOnInit();
    }

}
