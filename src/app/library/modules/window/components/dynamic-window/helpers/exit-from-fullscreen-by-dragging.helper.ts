import { ɵGetPercentage, ɵGetPercentageBetweenNumbers, ɵPointerHelper } from '../../../../../core';
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

    public getPointerShiftX(event: PointerEvent | TouchEvent): number {
        const clientX = ɵPointerHelper.getClientX(event);
        const targetWindowWidth = this.windowWidthAtWindowedMode;
        const xPointerInPercents = ɵGetPercentageBetweenNumbers(clientX, innerWidth);
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

    public getPointerShiftY(event: PointerEvent | TouchEvent): number {
        const clientY = ɵPointerHelper.getClientY(event);
        const titleBarClientRect = this.context._titleBarElement.getBoundingClientRect();
        const yPointerInWindowedWindow = (clientY - titleBarClientRect.top);

        return yPointerInWindowedWindow;
    }
}
