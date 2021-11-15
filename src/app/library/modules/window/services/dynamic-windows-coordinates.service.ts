import { Injectable } from '@angular/core';
import { DynamicWindowRefModel } from '../classes';

/** @internal */
@Injectable({
    providedIn: 'root'
})
export class DynamicWindowsCoordinatesService {
    private readonly base = 96;
    private readonly multiplier = 32;
    private readonly maxAmountOfWindows = 8;
    private currentAmountOfWindows = 0;

    public applyDefault(windowRef: DynamicWindowRefModel): void {
        if (
            typeof(windowRef.config.positionX) !== 'number' &&
            typeof(windowRef.config.positionY) !== 'number'
        ) {
            if (this.currentAmountOfWindows >= this.maxAmountOfWindows) {
                this.currentAmountOfWindows = 0;
            }

            const targetPosition = (this.base + (this.multiplier * this.currentAmountOfWindows));
            this.currentAmountOfWindows++;

            windowRef.updateConfig({
                positionX: targetPosition,
                positionY: targetPosition
            });
        }
    }
}
