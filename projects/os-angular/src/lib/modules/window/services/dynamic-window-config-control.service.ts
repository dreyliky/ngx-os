import { Injectable } from '@angular/core';
import { DynamicWindowConfig } from '../classes';

@Injectable({
    providedIn: 'root'
})
export class DynamicWindowConfigControlService {
    private readonly coordinateManager = {
        base: 96,
        multiplier: 32,
        maxAmountOfWindows: 8,
        currentAmoutOfWindows: 0
    };

    public process(config: DynamicWindowConfig): DynamicWindowConfig {
        this.initDefaultPosition(config);

        return config;
    }

    private initDefaultPosition(config: DynamicWindowConfig): void {
        if (typeof(config.positionX) !== 'number' && typeof(config.positionY) !== 'number') {
            if (this.coordinateManager.currentAmoutOfWindows >= this.coordinateManager.maxAmountOfWindows) {
                this.coordinateManager.currentAmoutOfWindows = 0;
            }

            const targetPosition = (
                this.coordinateManager.base +
                (this.coordinateManager.multiplier * this.coordinateManager.currentAmoutOfWindows)
            );
            config.positionX = targetPosition;
            config.positionY = targetPosition;

            this.coordinateManager.currentAmoutOfWindows++;
        }
    }
}
