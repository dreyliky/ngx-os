import { ɵPercentsHelper } from '../../../../../core';
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

    public getPointerShiftX(clientX: number): number {
        const targetWindowWidth = this.windowWidthAtWindowedMode;
        const xPointerPositionInPercents = ɵPercentsHelper
            .secondFromFirstNumber(clientX, innerWidth);
        const xPointerPositionInWindowedWindow = ɵPercentsHelper
            .numberFromTotalNumberAndPercentPart(targetWindowWidth, xPointerPositionInPercents);
        const draggableZoneWidth = (
            targetWindowWidth - this.context._titleBarControlsElementWidth
        );

        let shiftX = xPointerPositionInWindowedWindow;

        if (xPointerPositionInWindowedWindow >= draggableZoneWidth) {
            shiftX = draggableZoneWidth;
        }

        return shiftX;
    }

    public getPointerShiftY(): number {
        return (this.context._titleBarElement.clientHeight / 2);
    }
}
