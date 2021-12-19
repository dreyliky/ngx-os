import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { ɵOsBaseComponent } from '../../../../core';

@Component({
    selector: 'os-text',
    template: '<ng-content></ng-content>',
    host: {
        'class': 'os-text'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextComponent extends ɵOsBaseComponent implements OnInit {
    constructor(
        private readonly hostRef: ElementRef<HTMLElement>
    ) {
        super();
    }

    public ngOnInit(): void {
        this.initElementEventObservers(this.hostRef.nativeElement);
    }
}
