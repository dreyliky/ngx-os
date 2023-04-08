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

    public get onPaste$(): Observable<string> {
        return this._onPaste$.asObservable();
    }

    private _onPaste$ = new Subject<string>();

    constructor(
        private readonly stateService: EditorState
    ) {}

    public set(data: string): void {
        this.stateService.set(data);
    }

    public paste(data: string): void {
        this._onPaste$.next(data);
    }
}
