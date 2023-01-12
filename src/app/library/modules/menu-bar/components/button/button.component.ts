import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    HostBinding,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { filter, map, takeUntil } from 'rxjs';
import { ɵCommonCssClassEnum, ɵOsBaseViewComponent } from '../../../../core';
import { ɵMenuBarActiveButtonState } from '../../states';

@Component({
    selector: 'button[os-menu-bar-button]',
    template: '<ng-content></ng-content>',
    host: {
        'class': 'os-menu-bar-button'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuBarButtonComponent extends ɵOsBaseViewComponent implements OnInit {
    /** @internal */
    @HostBinding(`class.${ɵCommonCssClassEnum.Active}`)
    public _isActive = false;

    constructor(
        private readonly activeButtonState: ɵMenuBarActiveButtonState,
        private readonly changeDetector: ChangeDetectorRef
    ) {
        super();
    }

    public ngOnInit(): void {
        this.initMenuBarActiveButtonObserver();
    }

    private initMenuBarActiveButtonObserver(): void {
        this.activeButtonState.data$
            .pipe(
                map((activeButton) => (activeButton === this)),
                filter((isButtonActive) => (isButtonActive !== this._isActive)),
                takeUntil(this.viewDestroyed$)
            )
            .subscribe((isButtonActive) => {
                this._isActive = isButtonActive;

                this.changeDetector.markForCheck();
            });
    }
}
