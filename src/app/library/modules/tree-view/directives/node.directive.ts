import { Directive, Input } from '@angular/core';
import { ɵNodeTemplateContext } from '../interfaces';

@Directive({
    selector: '[osTreeViewNode]',
    exportAs: 'osTreeViewNode'
})
export class TreeViewNodeDirective<T = any> {
    @Input()
    // eslint-disable-next-line no-empty-function, @typescript-eslint/no-empty-function
    public set ngTemplateType(type: T) {}

    public static ngTemplateContextGuard<T>(
        directive: TreeViewNodeDirective<T>,
        context: unknown
    ): context is ɵNodeTemplateContext<T> {
        return true;
    }
}
