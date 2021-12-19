/** @internal */
export type ɵInvertedKeysOfType<T, U> = {
    [K in keyof T as T[K] extends U ? never : K]: T[K]
}
