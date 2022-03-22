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
        this.futureHistory.reset();
        this.adjustPastHistorySize();
        this.updateActionAvailabilityStates();
    }

    public undo(): void {
        const removedItem = this.pastHistory.popItem();

        this.futureHistory.pushItem(removedItem);
        this.adjustFutureHistorySize();
        this.emitActualState();
        this.pastHistory.resetIfLastStateRemained();
        this.updateActionAvailabilityStates();
    }

    public redo(): void {
        const removedItem = this.futureHistory.popItem();

        this.pastHistory.pushItem(removedItem);
        this.adjustPastHistorySize();
        this.updateActionAvailabilityStates();
        this.emitActualState();
    }

    private adjustPastHistorySize(): void {
        if (this.pastHistory.data.length > this.maxStates) {
            this.pastHistory.shiftItem();
        }
    }

    private adjustFutureHistorySize(): void {
        if (this.futureHistory.data.length > this.maxStates) {
            this.futureHistory.shiftItem();
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
