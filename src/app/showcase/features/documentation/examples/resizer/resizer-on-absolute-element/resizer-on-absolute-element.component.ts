import {
    ChangeDetectionStrategy, Component,
    ElementRef,
    ViewChild
} from '@angular/core';

@Component({
    selector: 'showcase-resizer-on-absolute-element',
    templateUrl: './resizer-on-absolute-element.component.html',
    styleUrls: ['./resizer-on-absolute-element.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResizerOnAbsoluteElementComponent {
    @ViewChild('containerHideButton', { read: ElementRef })
    private readonly containerHideButton: ElementRef<HTMLElement>;

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

    public onToggleContainerVisibilityButtonClick(): void {
        this.isContainerVisible = !this.isContainerVisible;
    }
}
