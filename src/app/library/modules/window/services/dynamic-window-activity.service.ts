import { Injectable } from '@angular/core';
import { WindowReferencesState } from '../states';

/** @internal */
@Injectable({
    providedIn: 'root'
})
export class DynamicWindowActivityService {
    constructor(
        private readonly state: WindowReferencesState
    ) {}

    public makeAllInactiveExceptSpecificId(id: string): void {
        this.state.data.forEach((windowRef) => {
            if (windowRef.id !== id && windowRef.isActive) {
                windowRef.makeInactive();
            }
        });
    }
}
