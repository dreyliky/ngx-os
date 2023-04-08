/** @internal */
export abstract class ɵErrorHelper {
    public static warn(context: Object, message: string): void {
        const contextName = context.constructor.name;

        console.warn(`ngx-os: ${contextName}: ${message}`);
    }

    public static error(context: Object, message: string): void {
        const contextName = context.constructor.name;

        throw new Error(`ngx-os: ${contextName}: ${message}`);
    }
}
