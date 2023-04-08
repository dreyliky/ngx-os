import { Directive, Input } from '@angular/core';
import { ɵNodeTemplateContext } from '../interfaces';

/** Allows you to add types for ng-template, by passing [ngTemplateType] input parameter. */
@Directive({
    selector: '[osTreeViewNode]',
    exportAs: 'osTreeViewNode'
})
export class TreeViewNodeDirective<T = any> {
    /** @internal */
    @Input()
    // eslint-disable-next-line no-empty-function, @typescript-eslint/no-empty-function
    public set ngTemplateType(type: T) {}

    /** @internal */
    public static ngTemplateContextGuard<T>(
        directive: TreeViewNodeDirective<T>,
        context: unknown
    ): context is ɵNodeTemplateContext<T> {
        return true;
    }
}
