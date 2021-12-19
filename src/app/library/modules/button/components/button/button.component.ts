import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { ɵOsBaseButtonComponent } from '../../../../core';

@Component({
    selector: 'os-button',
    template: '<ng-content></ng-content>',
    host: {
        'class': 'os-button'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent extends ɵOsBaseButtonComponent implements OnInit {
    constructor(
        private readonly hostRef: ElementRef<HTMLElement>
    ) {
        super();
    }

    public ngOnInit(): void {
        this.initElementEventObservers(this.hostRef.nativeElement);
    }
}
