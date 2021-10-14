import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostBinding,
    Input,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { CommonCssClassEnum, OsBaseComponent } from '../../../../core';

@Component({
    selector: 'os-title-bar',
    templateUrl: './title-bar.component.html',
    host: {
        'class': 'os-title-bar'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleBarComponent extends OsBaseComponent implements OnInit {
    /** Marks title bar as active (means user works with it right now) */
    @Input()
    @HostBinding(`class.${CommonCssClassEnum.Active}`)
    public readonly isActive: boolean = true;

    constructor(
        protected readonly hostRef: ElementRef<HTMLElement>
    ) {
        super();
    }

    public ngOnInit(): void {
        this.initElementEventObservers(this.hostRef.nativeElement);
    }
}
