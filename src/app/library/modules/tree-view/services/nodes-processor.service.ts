import { Injectable } from '@angular/core';
import { ɵTreeNodesDepthState, ɵTreeNodesState } from '../states';

/** @internal */
@Injectable()
export class ɵTreeNodesProcessorService<T> {
    private childrenHandler: (node: T) => T[];

    constructor(
        private readonly nodesState: ɵTreeNodesState,
        private readonly nodesDepthState: ɵTreeNodesDepthState
    ) {}

    public register(nodes: T[], childrenHandler: (node: T) => T[]): void {
        this.childrenHandler = childrenHandler;

        this.nodesState._clearFlatData();
        this.registerRecursively(nodes);
        this.nodesState.set(nodes);
    }

    private registerRecursively(nodes: T[], currentDepth: number = 0): void {
        nodes.forEach((node) => {
            const children = this.childrenHandler(node);

            this.nodesState._pushToFlatData(node);
            this.nodesDepthState.set(node, currentDepth);

            if (children) {
                const nextDepth = (currentDepth + 1);

                this.registerRecursively(children, nextDepth);
            }
        });
    }
}
