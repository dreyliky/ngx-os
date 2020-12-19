import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Doc } from "../interfaces";

@Injectable({
    providedIn: 'root'
})
export class DocStateService {

    public get doc (): Doc {
        return this._doc$.getValue();
    }

    public get doc$ (): Observable<Doc> {
        return this._doc$.asObservable();
    }

    private readonly _doc$ = new BehaviorSubject<Doc>(null);

    constructor () {}

    public setDoc (doc: Doc): void {
        this._doc$.next(doc);
    }

}
