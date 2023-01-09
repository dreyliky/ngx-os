/* eslint-disable @typescript-eslint/member-ordering */
import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
    template: ''
})
export abstract class ɵOsBaseViewComponent implements AfterViewInit, OnDestroy {
    private _viewDestroyed$ = new Subject<boolean>();
    private _whenViewInit$ = new ReplaySubject<boolean>();
    private _isViewInit: boolean;

    protected whenViewInit$ = this._whenViewInit$.asObservable()
        .pipe(first());

    protected viewDestroyed$ = this._viewDestroyed$.asObservable();

    protected get isViewInit(): boolean {
        return this._isViewInit;
    }

    public ngAfterViewInit(): void {
        this._isViewInit = true;

        this._whenViewInit$.next(true);
    }

    public ngOnDestroy(): void {
        this._viewDestroyed$.next(true);
        this._viewDestroyed$.complete();
        this._whenViewInit$.complete();
    }
}
