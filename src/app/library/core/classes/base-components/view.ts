import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
    template: ''
})
export abstract class OsBaseViewComponent implements AfterViewInit, OnDestroy {
    protected get whenViewInit$(): Observable<boolean> {
        return this._whenViewInit$
            .asObservable()
            .pipe(first());
    }

    protected get viewDestroyed$(): Observable<boolean> {
        return this._viewDestroyed$.asObservable();
    }

    protected get isViewInit(): boolean {
        return this._isViewInit;
    }

    protected _isViewInit: boolean;
    private _viewDestroyed$ = new Subject<boolean>();
    private _whenViewInit$ = new ReplaySubject<boolean>();

    public ngAfterViewInit(): void {
        this._isViewInit = true;
        this._whenViewInit$.next(true);
    }

    public ngOnDestroy(): void {
        this._viewDestroyed$.next();
        this._viewDestroyed$.complete();
        this._whenViewInit$.complete();
    }
}
