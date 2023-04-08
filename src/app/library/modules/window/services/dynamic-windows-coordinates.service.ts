import { Injectable } from '@angular/core';
import { ɵIsNumber } from '../../../core';
import { ɵDynamicWindowRefModel } from '../classes';

/** @internal */
@Injectable({
    providedIn: 'root'
})
export class ɵDynamicWindowsDefaultCoordinatesService {
    private readonly base = 96;
    private readonly multiplier = 32;
    private readonly maxAmountOfWindows = 8;
    private currentAmountOfWindows = 0;

    public applyIfSpecificAbsent(windowRef: ɵDynamicWindowRefModel): void {
        if (!ɵIsNumber(windowRef.config.positionX) || !ɵIsNumber(windowRef.config.positionY)) {
            this.resetCurrentAmountOfWindowsIfExceedsMax();

            const targetPosition = this.calculate();
            this.currentAmountOfWindows++;

            windowRef.updateConfig({
                positionX: (windowRef.config.positionX ?? targetPosition),
                positionY: (windowRef.config.positionY ?? targetPosition)
            });
        }
    }

    private resetCurrentAmountOfWindowsIfExceedsMax(): void {
        if (this.currentAmountOfWindows >= this.maxAmountOfWindows) {
            this.currentAmountOfWindows = 0;
        }
    }

    private calculate(): number {
        return (this.base + (this.multiplier * this.currentAmountOfWindows));
    }
}
