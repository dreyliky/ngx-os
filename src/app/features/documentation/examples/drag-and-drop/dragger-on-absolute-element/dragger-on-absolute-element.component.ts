import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    ViewChild
} from '@angular/core';
import { DragStrategyByAxisProperties, IDraggerParams } from '@lib-modules';

@Component({
    selector: 'demo-dragger-on-absolute-element',
    templateUrl: './dragger-on-absolute-element.component.html',
    styleUrls: ['./dragger-on-absolute-element.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DraggerOnAbsoluteElementComponent implements AfterViewInit {
    @ViewChild('containerHideButton', { read: ElementRef })
    private readonly containerHideButton: ElementRef<HTMLElement>;

    public draggerConfig: IDraggerParams;

    public isContainerVisible = false;

    public get labelOfToggleVisibilityButton(): string {
        const action = (this.isContainerVisible) ? 'Hide' : 'Show';

        return `${action} container`;
    }

    public get containerStyles(): object {
        return {
            display: (this.isContainerVisible) ? '' : 'none'
        };
    }

    constructor(
        private readonly changeDetector: ChangeDetectorRef
    ) {}

    public ngAfterViewInit(): void {
        this.draggerConfig = {
            strategy: new DragStrategyByAxisProperties(),
            childElementsBlackList: [this.containerHideButton.nativeElement]
        };

        this.changeDetector.detectChanges();
    }

    public onToggleContainerVisibilityButtonClick(): void {
        this.isContainerVisible = !this.isContainerVisible;
    }
}
