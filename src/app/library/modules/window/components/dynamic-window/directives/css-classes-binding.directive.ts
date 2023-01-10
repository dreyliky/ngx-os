import { Directive, DoCheck, ElementRef } from '@angular/core';
import {
    ɵDynamicWindowCssClassEnum as CssClass
} from '../../../enums';
import { ɵDynamicWindowComponent } from '../dynamic-window.component';
import { ɵStateManager } from '../services';

/** @internal */
@Directive({
    selector: 'os-window[osDynamicWindowCssClassesBinding]'
})
export class ɵDynamicWindowCssClassesBindingDirective implements DoCheck {
    private get windowState(): ɵStateManager {
        return this.context.stateManager;
    }

    constructor(
        private readonly elementRef: ElementRef<HTMLElement>,
        private readonly context: ɵDynamicWindowComponent
    ) {}

    public ngDoCheck(): void {
        this.applyCssClassesToElementRef();
    }

    private applyCssClassesToElementRef(): void {
        this.applyCssClass(CssClass.Opening, this.windowState.isOpening);
        this.applyCssClass(CssClass.Hiding, this.windowState.isHiding);
        this.applyCssClass(CssClass.Showing, this.windowState.isShowing);
        this.applyCssClass(CssClass.Closing, this.windowState.isClosing);
        this.applyCssClass(CssClass.EnteringFullscreen, this.windowState.isEnteringFullscreen);
        this.applyCssClass(CssClass.EnteringWindowed, this.windowState.isEnteringWindowed);
        this.applyCssClass(CssClass.Hidden, this.windowState.isHidden);
        this.applyCssClass(CssClass.Fullscreen, this.windowState.isFullscreen);
        this.applyCssClass(CssClass.Windowed, this.windowState.isWindowed);
    }

    private applyCssClass(cssClass: CssClass, value: any): void {
        const windowElement = this.elementRef.nativeElement;

        windowElement.classList.toggle(cssClass, value);
    }
}
