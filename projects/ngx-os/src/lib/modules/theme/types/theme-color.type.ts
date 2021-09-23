/**
 * ### Description
 * List of color types that are used by themes for different parts of components.
 * Each color type stores in the CSS variable. So, it might be used in your code too.
 *
 * ### How to use for styling your components?
 *
 * Use native CSS syntax to get value from each color type:
 *
 * ```scss
 * .my-element {
 *     color: rgb(var(--os-primary-color));
 *     background-color: rgba(var(--os-background-color), 0.8);
 * }
 * ```
 *
 * In this case, library's color-type variable name consists from next parts:
 *
 * `os`-`COLOR_TYPE`-`color`.
 */
export type ThemeColorType = 'primary' | 'background';
