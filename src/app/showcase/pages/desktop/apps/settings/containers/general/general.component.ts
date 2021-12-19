import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { DynamicWindowService, ɵDynamicWindowCssVariableEnum as WindowCssVariable } from 'ngx-os';

@Component({
    selector: 'settings-general-section',
    templateUrl: './general.component.html',
    styleUrls: ['./general.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeneralComponent {
    constructor(
        @Inject(DOCUMENT) private readonly document: Document,
        private readonly dynamicWindowService: DynamicWindowService
    ) {}

    public onToggleFullscreenButtonClick(): void {
        if (!this.document.fullscreenElement) {
            this.document.documentElement.requestFullscreen();
        } else {
            this.document.exitFullscreen();
        }
    }

    public onMoveWindowsToVisibleAreaButtonClick(): void {
        this.dynamicWindowService.references
            .forEach((windowRef) => {
                if (this.isWindowOutsideOfVisibleArea(windowRef.windowElement)) {
                    windowRef.windowElement.style.setProperty(WindowCssVariable.Left, '64px');
                    windowRef.windowElement.style.setProperty(WindowCssVariable.Top, '64px');
                }
            });
    }

    private isWindowOutsideOfVisibleArea(element: HTMLElement): boolean {
        const sideOffset = 100;
        const { left, top } = element.getBoundingClientRect();

        return (
            left >= (innerWidth - sideOffset) ||
            left <= 0 ||
            top >= (innerHeight - sideOffset) ||
            top <= 0
        );
    }
}
