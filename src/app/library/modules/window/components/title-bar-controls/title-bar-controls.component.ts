import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { ɵOsBaseComponent } from '../../../../core';

@Component({
    selector: 'os-title-bar-controls',
    template: '<ng-content></ng-content>',
    host: {
        'class': 'os-title-bar-controls'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleBarControlsComponent extends ɵOsBaseComponent implements OnInit {
    constructor(
        private readonly hostRef: ElementRef<HTMLElement>
    ) {
        super();
    }

    public ngOnInit(): void {
        this.initElementEventObservers(this.hostRef.nativeElement);
    }
}
