import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Doc } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class LibraryDocumentationState {
    public get data(): Doc {
        return this._data$.getValue();
    }

    public get data$(): Observable<Doc> {
        return this._data$.asObservable();
    }

    private readonly _data$ = new BehaviorSubject<Doc>(null);

    public set(doc: Doc): void {
        this._data$.next(doc);
    }
}
