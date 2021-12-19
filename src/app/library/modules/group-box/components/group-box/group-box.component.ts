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
    selector: 'os-group-box',
    templateUrl: './group-box.component.html',
    host: {
        'class': 'os-group-box'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupBoxComponent extends ɵOsBaseComponent implements OnInit {
    /** Label of group */
    @Input()
    public label: string;

    constructor(
        private readonly hostRef: ElementRef<HTMLElement>
    ) {
        super();
    }

    public ngOnInit(): void {
        this.initElementEventObservers(this.hostRef.nativeElement);
    }
}
