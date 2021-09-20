import { Injectable } from '@angular/core';
import { DynamicWindowRef } from '../classes';
import { WindowReferencesState } from '../states';

/** Private service */
@Injectable({
    providedIn: 'root'
})
export class DynamicWindowRefOrderingService {
    private readonly windowOrderIds: string[] = [];

    constructor(
        private readonly state: WindowReferencesState
    ) {}

    public get(id: string): number {
        return this.windowOrderIds.indexOf(id);
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
            this.windowOrderIds.splice(targetWindowOrderIdIndex, 1);
        }
    }

    public moveToTop(id: string): void {
        this.remove(id);
        this.windowOrderIds.push(id);
    }

    public getHighestOpened(): DynamicWindowRef {
        let index = (this.windowOrderIds.length - 1);

        while (index >= 0) {
            const currentWindowRefId = this.windowOrderIds[index];
            const currentWindowRef = this.state.getById(currentWindowRefId);

            if (!currentWindowRef.isHidden) {
                return currentWindowRef;
            }

            index--;
        }
    }
}