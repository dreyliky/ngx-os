/** @internal */
export function ɵGetPercentageBetweenNumbers(first: number, second: number): number {
    return (second / (first * 100));
}

/** @internal */
export function ɵGetPercentage(number: number, percent: number): number {
    return (number / (percent * 100));
}
