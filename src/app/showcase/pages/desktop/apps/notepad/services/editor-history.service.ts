import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { EditorFutureHistoryState, EditorPastHistoryState } from '../states';

@Injectable()
export class EditorHistoryService {
    public get isUndoAvailable$(): Observable<boolean> {
        return this._isUndoAvailable$.asObservable();
    }

    public get isRedoAvailable$(): Observable<boolean> {
        return this._isRedoAvailable$.asObservable();
    }

    public get onActualState$(): Observable<string> {
        return this._onActualState$.asObservable();
    }

    private readonly _isUndoAvailable$ = new BehaviorSubject<boolean>(false);
    private readonly _isRedoAvailable$ = new BehaviorSubject<boolean>(false);
    private readonly _onActualState$ = new Subject<string>();

    private readonly maxStates = 6;

    constructor(
        private readonly pastHistory: EditorPastHistoryState,
        private readonly futureHistory: EditorFutureHistoryState
    ) {}

    public registerEditorState(state: string): void {
        this.pastHistory.pushItem(state);
        this.futureHistory.restoreInitialData();
        this.adjustPastHistorySize();
        this.updateActionAvailabilityStates();
    }

    public undo(): void {
        const lastItemIndex = (this.pastHistory.data.length - 1);
        const removedItem = this.pastHistory.removeItemByIndex(lastItemIndex);

        this.futureHistory.pushItem(removedItem);
        this.adjustFutureHistorySize();
        this.emitActualState();
        this.pastHistory.resetIfLastStateRemained();
        this.updateActionAvailabilityStates();
    }

    public redo(): void {
        const lastItemIndex = (this.futureHistory.data.length - 1);
        const removedItem = this.futureHistory.removeItemByIndex(lastItemIndex);

        this.pastHistory.pushItem(removedItem);
        this.adjustPastHistorySize();
        this.updateActionAvailabilityStates();
        this.emitActualState();
    }

    private adjustPastHistorySize(): void {
        if (this.pastHistory.data.length > this.maxStates) {
            this.pastHistory.shift();
        }
    }

    private adjustFutureHistorySize(): void {
        if (this.futureHistory.data.length > this.maxStates) {
            this.futureHistory.shift();
        }
    }

    private updateActionAvailabilityStates(): void {
        this._isUndoAvailable$.next(!!this.pastHistory.data.length);
        this._isRedoAvailable$.next(!!this.futureHistory.data.length);
    }

    private emitActualState(): void {
        const actualState = this.pastHistory.data[this.pastHistory.data.length - 1];

        if (actualState) {
            this._onActualState$.next(actualState);
        }
    }
}
