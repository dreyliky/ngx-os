import { Injectable } from '@angular/core';
import { ArrayState, NgxState } from 'ngx-base-state';

@Injectable()
@NgxState()
export class EditorPastHistoryState extends ArrayState<string> {
    constructor() {
        super([]);
    }

    public resetIfLastStateRemained(): void {
        if (this.data.length === 1) {
            this.restoreInitialData();
        }
    }
}
