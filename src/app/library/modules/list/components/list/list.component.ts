import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { ɵOsBaseComponent } from '../../../../core';

@Component({
    selector: 'os-list',
    templateUrl: './list.component.html',
    host: {
        'class': 'os-list'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent extends ɵOsBaseComponent implements OnInit {
    /** Stylelist for scroll view component of the list */
    @Input()
    public scrollViewStyle: object;

    /** Classlist for scroll view component of the list */
    @Input()
    public scrollViewStyleClass: string;

    constructor(
        private readonly hostRef: ElementRef<HTMLElement>
    ) {
        super();
    }

    public ngOnInit(): void {
        this.initElementEventObservers(this.hostRef.nativeElement);
    }
}
