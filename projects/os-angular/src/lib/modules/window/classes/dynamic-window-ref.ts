import { Observable, Subject } from 'rxjs';

export class DynamicWindowRef {

    public get afterClosed$ (): Observable<any> {
        return this._afterClosed.asObservable();
    }

    private readonly _afterClosed = new Subject<any>();

    constructor () {}

    public close (result?: any): void {
        this._afterClosed.next(result);
    }

}
