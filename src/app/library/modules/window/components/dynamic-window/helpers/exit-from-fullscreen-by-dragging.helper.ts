import { ɵGetPercentage, ɵGetPercentageBetweenNumbers } from '../../../../../core';
import { ɵDynamicWindowCssVariableEnum as CssVariable } from '../../../enums';
import { ɵDynamicWindowDraggableDirective } from '../directives/draggable.directive';

/** @internal */
export class ɵExitFromFullscreenHelper {
    private get windowWidthAtWindowedMode(): number {
        const widthAsCssString = this.context._windowElement.style
            .getPropertyValue(CssVariable.Width);

        return parseFloat(widthAsCssString);
    }

    constructor(
        private readonly context: ɵDynamicWindowDraggableDirective
    ) {}

    public getPointerShiftX(event: MouseEvent): number {
        const targetWindowWidth = this.windowWidthAtWindowedMode;
        const xPointerInPercents = ɵGetPercentageBetweenNumbers(event.clientX, innerWidth);
        const xPointerInWindowedWindow = ɵGetPercentage(targetWindowWidth, xPointerInPercents);
        const draggableZoneWidth = (
            targetWindowWidth - this.context._titleBarControlsElementWidth
        );
        let shiftX = xPointerInWindowedWindow;

        if (xPointerInWindowedWindow >= draggableZoneWidth) {
            shiftX = draggableZoneWidth;
        }

        return shiftX;
    }

    public getPointerShiftY(event: MouseEvent): number {
        const titleBarClientRect = this.context._titleBarElement.getBoundingClientRect();
        const yPointerInWindowedWindow = (event.clientY - titleBarClientRect.top);

        return yPointerInWindowedWindow;
    }
}
