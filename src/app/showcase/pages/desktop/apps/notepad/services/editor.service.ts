import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { EditorState } from '../states';

@Injectable()
export class EditorService {
    public get data$(): Observable<string> {
        return this.stateService.data$;
    }

    public get data(): string {
        return this.stateService.data;
    }

    public get onPast$(): Observable<string> {
        return this._onPast$.asObservable();
    }

    private _onPast$ = new Subject<string>();

    constructor(
        private readonly stateService: EditorState
    ) {}

    public set(data: string): void {
        this.stateService.set(data);
    }

    public past(data: string): void {
        this._onPast$.next(data);
    }
}
