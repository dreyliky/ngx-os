import { Injectable } from '@angular/core';
import { DynamicWindowRef } from '../classes';
import { WindowReferencesState } from '../states';

/** Private service */
@Injectable({
    providedIn: 'root'
})
export class DynamicWindowRefOrderingService {
    public get windowOrderIds(): string[] {
        return this._windowOrderIds;
    }

    private readonly _windowOrderIds: string[] = [];

    constructor(
        private readonly state: WindowReferencesState
    ) {}

    public get(id: string): number {
        return this._windowOrderIds.indexOf(id);
    }

    public updateOrderIndexStateForAll(): void {
        this.state.data.forEach((windowRef) => {
            const orderIndex = this.get(windowRef.id);

            windowRef.setOrderIndex(orderIndex);
        });
    }

    public remove(id: string): void {
        const targetWindowOrderIdIndex = this.get(id);

        if (targetWindowOrderIdIndex !== -1) {
            this._windowOrderIds.splice(targetWindowOrderIdIndex, 1);
        }
    }

    public moveToTop(id: string): void {
        this.remove(id);
        this._windowOrderIds.push(id);
    }

    public getHighestOpened(): DynamicWindowRef {
        let index = (this._windowOrderIds.length - 1);

        while (index >= 0) {
            const currentWindowRefId = this._windowOrderIds[index];
            const currentWindowRef = this.state.getById(currentWindowRefId);

            if (!currentWindowRef.isHidden) {
                return currentWindowRef;
            }

            index--;
        }
    }
}
