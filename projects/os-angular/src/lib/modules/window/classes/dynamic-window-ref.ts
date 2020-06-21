import { Observable, Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

export class DynamicWindowRef {

    public get isHidden$ (): Observable<any> {
        return this._isHidden$.asObservable();
    }

    public get afterClosed$ (): Observable<any> {
        return this._afterClosed$.asObservable();
    }

    private readonly _isHidden$ = new BehaviorSubject<boolean>(false);
    private readonly _afterClosed$ = new Subject<any>();

    constructor () {}

    public hide (): void {
        this._isHidden$.next(true);
    }

    public show (): void {
        this._isHidden$.next(false);
    }

    public close (result?: any): void {
        this._afterClosed$.next(result);
    }

}
