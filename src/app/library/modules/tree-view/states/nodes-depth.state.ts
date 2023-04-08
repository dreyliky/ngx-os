import { Injectable, OnDestroy } from '@angular/core';

/** @internal */
@Injectable()
export class ɵTreeNodesDepthState<T = any> implements OnDestroy {
    private readonly _depthMap = new Map<T, number>();

    public ngOnDestroy(): void {
        this._depthMap.clear();
    }

    public get(node: T): number | undefined {
        return this._depthMap.get(node);
    }

    public set(node: T, depth: number): void {
        this._depthMap.set(node, depth);
    }
}
