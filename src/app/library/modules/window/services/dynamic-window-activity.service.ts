import { Injectable } from '@angular/core';
import { ɵWindowReferencesState } from '../states';

/** @internal */
@Injectable({
    providedIn: 'root'
})
export class ɵDynamicWindowActivityService {
    constructor(
        private readonly state: ɵWindowReferencesState
    ) {}

    public makeAllInactiveExceptSpecificId(id: string): void {
        this.state.data.forEach((windowRef) => {
            if (windowRef.id !== id && windowRef.isActive) {
                windowRef.makeInactive();
            }
        });
    }
}
