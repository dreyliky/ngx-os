/** @internal */
class Params {
    public delayBetweenChecksInMs: number = 8;
    public maxCheckCount: number = 30;
}

/** @internal */
interface StartParams {
    onIteration?: () => void;
    onEnd?: () => void;
}

/** @internal */
export class IntervalCheckerHelper {
    private readonly delayBetweenChecksInMs: number;
    private readonly maxCheckCount: number;

    private passedCountOfChecks = 0;
    private currentIntervalId = 0;

    private onIteration: () => void;
    private onEnd: () => void;

    constructor({ delayBetweenChecksInMs, maxCheckCount }: Params = new Params()) {
        this.delayBetweenChecksInMs = delayBetweenChecksInMs;
        this.maxCheckCount = maxCheckCount;
    }

    public start({ onIteration, onEnd }: StartParams): void {
        this.onIteration = onIteration;
        this.onEnd = onEnd;

        if (this.currentIntervalId) {
            this.reset();
        }

        this.initChecking();
    }

    public reset(): void {
        clearInterval(this.currentIntervalId);
        this.currentIntervalId = 0;
        this.passedCountOfChecks = 0;
    }

    private initChecking(): void {
        this.currentIntervalId = setInterval(() => {
            this.passedCountOfChecks++;

            if (this.passedCountOfChecks < this.maxCheckCount) {
                this.onIteration?.();
            } else {
                this.reset();
                this.onEnd?.();
            }
        }, this.delayBetweenChecksInMs);
    }
}
