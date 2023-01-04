import { Injectable } from '@angular/core';
import { ArrayState, NgxState } from 'ngx-base-state';

@Injectable()
@NgxState()
export class EditorFutureHistoryState extends ArrayState<string> {
    constructor() {
        super([]);
    }
}
