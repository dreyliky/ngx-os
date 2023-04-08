import {
    Directive,
    DoCheck,
    EmbeddedViewRef,
    Inject,
    Injector,
    Input,
    OnChanges,
    SimpleChanges,
    ViewContainerRef
} from '@angular/core';
import type { TreeViewComponent } from '../components/tree-view';
import { ɵTREE_NODE, ɵTREE_VIEW_COMPONENT } from '../constants';
import { ɵNodeTemplateContext } from '../interfaces';

/** @internal */
@Directive({
    selector: '[osTreeNodeOutlet]'
})
export class ɵTreeNodeOutletDirective<T = any> implements OnChanges, DoCheck {
    @Input('osTreeNodeOutlet')
    public node!: T;

    @Input('osTreeNodeOutletDepth')
    public depth!: number;

    @Input('osTreeNodeOutletIndex')
    public index!: number;

    private viewRef: EmbeddedViewRef<ɵNodeTemplateContext<T>>;

    constructor(
        @Inject(ɵTREE_VIEW_COMPONENT)
        private readonly treeView: TreeViewComponent,
        private readonly viewContainer: ViewContainerRef,
        private readonly injector: Injector
    ) {}

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.node.currentValue !== changes.node.previousValue) {
            this.viewContainer.clear();
            this.createNodeEmbeddedView();
        }
    }

    public ngDoCheck(): void {
        this.viewRef?.detectChanges();
    }

    private createNodeEmbeddedView(): void {
        const template = this.treeView._nodeTemplate;
        const injector = this.createTreeNodeInjector(this.node);
        const context: ɵNodeTemplateContext<T> = {
            $implicit: this.node,
            index: this.index,
            depth: this.depth
        };
        this.viewRef = this.viewContainer.createEmbeddedView(template, context, { injector });
    }

    private createTreeNodeInjector(node: T): Injector {
        return Injector.create({
            parent: this.injector,
            providers: [
                {
                    provide: ɵTREE_NODE,
                    useValue: node
                }
            ]
        });
    }
}
