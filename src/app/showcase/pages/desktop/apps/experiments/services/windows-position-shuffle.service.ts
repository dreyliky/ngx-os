import { Injectable } from '@angular/core';
import { DynamicWindowRefModel, RandomHelper } from 'ngx-os';

interface ShuffleParams {
    windowRefs: DynamicWindowRefModel[];
    ignoreWindowRefIds: string[];
    iterationDelayInMs: number;
}

@Injectable()
export class WindowsPositionShuffleService {
    private readonly padding = 96;

    private windowRefs: DynamicWindowRefModel[];
    private ignoreWindowRefIds: string[];
    private delay: number;

    private shuffleIntervalId: number;

    public shuffle(params: ShuffleParams): number {
        this.windowRefs = params.windowRefs;
        this.ignoreWindowRefIds = params.ignoreWindowRefIds;
        this.delay = params.iterationDelayInMs;

        return this.process();
    }

    private process(): number {
        let currentWindowRefIndex = 0;

        this.shuffleIntervalId = setInterval(() => {
            const currentWindowRef = this.windowRefs[currentWindowRefIndex];

            if (!this.ignoreWindowRefIds.includes(currentWindowRef.id)) {
                this.generateRandomPositionForWindowRef(currentWindowRef);
            }

            if (currentWindowRefIndex >= (this.windowRefs.length - 1)) {
                clearInterval(this.shuffleIntervalId);
            }

            currentWindowRefIndex++;
        }, this.delay);

        return this.shuffleIntervalId;
    }

    private generateRandomPositionForWindowRef(windowRef: DynamicWindowRefModel): void {
        const positionX = RandomHelper.getRandomInt(
            this.padding, (innerWidth - this.padding - windowRef.config.width)
        );
        const positionY = RandomHelper.getRandomInt(
            this.padding, (innerHeight - this.padding - windowRef.config.height)
        );

        windowRef.updateConfig({ positionX, positionY });
    }
}
