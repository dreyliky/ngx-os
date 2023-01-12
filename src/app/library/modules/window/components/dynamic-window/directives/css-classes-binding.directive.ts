import { Directive, DoCheck, HostBinding } from '@angular/core';
import { ɵDynamicWindowCssClassEnum as CssClass } from '../../../enums';
import { ɵStateManager } from '../services';

/** @internal */
@Directive({
    selector: 'os-window[osDynamicWindowCssClassesBinding]'
})
export class ɵDynamicWindowCssClassesBindingDirective implements DoCheck {
    @HostBinding('class')
    public cssClasses: object = {};

    constructor(
        private readonly windowState: ɵStateManager
    ) {}

    public ngDoCheck(): void {
        this.updateCssClasses();
    }

    private updateCssClasses(): void {
        this.cssClasses = {
            [CssClass.Opening]: this.windowState.isOpening,
            [CssClass.Hiding]: this.windowState.isHiding,
            [CssClass.Showing]: this.windowState.isShowing,
            [CssClass.Closing]: this.windowState.isClosing,
            [CssClass.EnteringFullscreen]: this.windowState.isEnteringFullscreen,
            [CssClass.EnteringWindowed]: this.windowState.isEnteringWindowed,
            [CssClass.Hidden]: this.windowState.isHidden,
            [CssClass.Fullscreen]: this.windowState.isFullscreen,
            [CssClass.Windowed]: this.windowState.isWindowed
        };
    }
}
