import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Doc } from "../interfaces";

@Injectable({
    providedIn: 'root'
})
export class DocStateService {

    public get libDoc (): Doc {
        return this._libDoc$.getValue();
    }

    public get libDoc$ (): Observable<Doc> {
        return this._libDoc$.asObservable();
    }

    public get demoDoc (): Doc {
        return this._demoDoc$.getValue();
    }

    public get demoDoc$ (): Observable<Doc> {
        return this._demoDoc$.asObservable();
    }

    private readonly _libDoc$ = new BehaviorSubject<Doc>(null);
    private readonly _demoDoc$ = new BehaviorSubject<Doc>(null);

    constructor () {}

    public setLibDoc (doc: Doc): void {
        console.log('lib-doc', doc);

        this._libDoc$.next(doc);
    }

    public setDemoDoc (doc: Doc): void {
        console.log('demo-doc', doc);

        this._demoDoc$.next(doc);
    }

}
