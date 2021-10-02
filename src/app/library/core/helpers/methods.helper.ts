/** @internal */
export function isNil(value: any): boolean {
    return (value === undefined || value === null);
}

/** @internal */
export function osParseInt(value: string): number {
    return Number.parseInt(value, 10);
}
