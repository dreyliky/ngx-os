import { Injectable } from '@angular/core';
import { DynamicWindowRefModel } from '../classes';
import { WindowReferencesState } from '../states';

/** @internal */
@Injectable({
    providedIn: 'root'
})
export class DynamicWindowRefOrderingService {
    /** Array of window ids. The larger the index of id, the higher the window */
    private readonly windowOrderIds: string[] = [];

    constructor(
        private readonly state: WindowReferencesState
    ) {}

    public getIndex(id: string): number {
        return this.windowOrderIds.indexOf(id);
    }

    public updateForAll(): void {
        this.state.data.forEach((windowRef) => {
            const orderIndex = this.getIndex(windowRef.id);

            windowRef.setOrderIndex(orderIndex);
        });
    }

    public remove(id: string): void {
        const targetWindowOrderIdIndex = this.getIndex(id);

        if (targetWindowOrderIdIndex !== -1) {
            this.windowOrderIds.splice(targetWindowOrderIdIndex, 1);
        }
    }

    public moveToTop(id: string): void {
        this.remove(id);
        this.windowOrderIds.push(id);
    }

    public getHighestOpened(): DynamicWindowRefModel | null {
        let index = (this.windowOrderIds.length - 1);

        while (index >= 0) {
            const currentWindowRefId = this.windowOrderIds[index];
            const currentWindowRef = this.state.getById(currentWindowRefId);

            if (!currentWindowRef.isHidden) {
                return currentWindowRef;
            }

            index--;
        }

        return null;
    }
}
