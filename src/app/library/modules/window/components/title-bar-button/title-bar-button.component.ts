import {
    ChangeDetectionStrategy,
    Component,
    Injector,
    Input,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { ɵOsBaseButtonComponent } from '../../../../core';

@Component({
    selector: 'os-title-bar-button',
    templateUrl: './title-bar-button.component.html',
    host: {
        'class': 'os-title-bar-button'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleBarButtonComponent extends ɵOsBaseButtonComponent implements OnInit {
    /** Link to the icon */
    @Input()
    public iconUrl: string;

    /** Stylelist for the icon */
    @Input()
    public iconStyle: object;

    /** Classlist for the icon */
    @Input()
    public iconStyleClass: string | string[] | object;

    /** @internal */
    public get _iconCssUrl(): string {
        return (this.iconUrl) ? `url(${this.iconUrl})` : null;
    }

    constructor(
        injector: Injector
    ) {
        super(injector);
    }

    public ngOnInit(): void {
        this.initClickObserver();
    }

    private initClickObserver(): void {
        this.osClick
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe((event) => event.stopPropagation());
    }
}
