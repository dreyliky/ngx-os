import { Injectable } from '@angular/core';
import { ArrayState } from '@core/classes';

@Injectable()
export class EditorPastHistoryState extends ArrayState<string> {
    constructor() {
        super([]);
    }

    public resetIfLastStateRemained(): void {
        if (this.data.length === 1) {
            this.reset();
        }
    }
}
