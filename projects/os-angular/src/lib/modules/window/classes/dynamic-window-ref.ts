import { ComponentRef } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import { DynamicWindowComponent } from '../components';
import { DynamicWindowParams } from '../interfaces';

export class DynamicWindowRef {
    public get isHidden$(): Observable<boolean> {
        return this._isHidden$.asObservable();
    }

    public get isHidden(): boolean {
        return this._isHidden$.getValue();
    }

    public get isFullscreen(): boolean {
        return this._isFullscreen$.getValue();
    }

    public get isFullscreen$(): Observable<boolean> {
        return this._isFullscreen$.asObservable();
    }

    public get afterClosed$(): Observable<any> {
        return this._afterClosed$.asObservable();
    }

    public get config$(): Observable<DynamicWindowParams> {
        return this._config$.asObservable();
    }

    public get config(): DynamicWindowParams {
        return this._config$.getValue();
    }

    public get windowElement(): HTMLElement {
        return this._windowElement$.getValue();
    }

    public get windowElement$(): Observable<HTMLElement> {
        return this._windowElement$.asObservable()
            .pipe(
                filter((element) => !!element),
                first()
            );
    }

    public get componentRef(): ComponentRef<DynamicWindowComponent> {
        return this._componentRef;
    }

    private readonly _config$ = new BehaviorSubject<DynamicWindowParams>({});
    private readonly _isHidden$ = new BehaviorSubject<boolean>(false);
    private readonly _isFullscreen$ = new BehaviorSubject<boolean>(false);
    private readonly _windowElement$ = new BehaviorSubject<HTMLElement>(null);
    private readonly _afterClosed$ = new Subject<any>();

    private _componentRef: ComponentRef<DynamicWindowComponent>;

    public updateConfig(config: DynamicWindowParams): void {
        this._config$.next({ ...this.config, ...config });
    }

    public hide(): void {
        this._isHidden$.next(true);
    }

    public show(): void {
        this._isHidden$.next(false);
    }

    public setIsHiddenState(state: boolean): void {
        this._isHidden$.next(state);
    }

    public goFullscreen(): void {
        this._isFullscreen$.next(true);
    }

    public goWindowed(): void {
        this._isFullscreen$.next(false);
    }

    public setFullscreenState(state: boolean): void {
        this._isFullscreen$.next(state);
    }

    public close<T>(result?: T): void {
        this._afterClosed$.next(result);
    }

    public _setWindowElement(element: HTMLElement): void {
        if (this._windowElement$.getValue()) {
            throw new Error(`Can't change windowElement`);
        }

        this._windowElement$.next(element);
    }

    public _setComponentRef(componentRef: ComponentRef<DynamicWindowComponent>): void {
        if (this._componentRef) {
            throw new Error(`Can't change componentRef`);
        }

        this._componentRef = componentRef;
    }
}
