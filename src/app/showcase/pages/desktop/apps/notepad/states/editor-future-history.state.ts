import { Injectable } from '@angular/core';
import { ArrayState } from '@core/classes';

@Injectable()
export class EditorFutureHistoryState extends ArrayState<string> {
    constructor() {
        super([]);
    }
}
