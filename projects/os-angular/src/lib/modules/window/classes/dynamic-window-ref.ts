import { Observable, Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { DynamicWindowConfig } from './dynamic-window-config';
import { first, filter } from 'rxjs/operators';

export class DynamicWindowRef {

    public get isHidden$ (): Observable<boolean> {
        return this._isHidden$.asObservable();
    }

    public get isHidden (): boolean {
        return this._isHidden$.getValue();
    }

    public get isFullscreen (): boolean {
        return this._isFullscreen$.getValue();
    }

    public get isFullscreen$ (): Observable<boolean> {
        return this._isFullscreen$.asObservable();
    }

    public get afterClosed$ (): Observable<any> {
        return this._afterClosed$.asObservable();
    }

    public get config$ (): Observable<DynamicWindowConfig> {
        return this._config$.asObservable();
    }

    public get config (): DynamicWindowConfig {
        return this._config$.getValue();
    }

    public get windowElement (): HTMLDivElement {
        return this._windowElement$.getValue();
    }

    public get windowElement$ (): Observable<HTMLDivElement> {
        return this._windowElement$.asObservable()
            .pipe(
                filter((element) => !!element),
                first()
            );
    }

    private readonly _config$ = new BehaviorSubject<DynamicWindowConfig>({});
    private readonly _isHidden$ = new BehaviorSubject<boolean>(false);
    private readonly _isFullscreen$ = new BehaviorSubject<boolean>(false);
    private readonly _windowElement$ = new BehaviorSubject<HTMLDivElement>(null);
    private readonly _afterClosed$ = new Subject<any>();

    constructor () {}

    public updateConfig (config: DynamicWindowConfig): void {
        this._config$.next({ ...this.config, ...config });
    }

    public hide (): void {
        this._isHidden$.next(true);
    }

    public show (): void {
        this._isHidden$.next(false);
    }

    public setIsHiddenState (state: boolean): void {
        this._isHidden$.next(state);
    }

    public goFullscreen (): void {
        this._isFullscreen$.next(true);
    }

    public goWindowed (): void {
        this._isFullscreen$.next(false);
    }

    public setFullscreenState (state: boolean): void {
        this._isFullscreen$.next(state);
    }

    public close (result?: any): void {
        this._afterClosed$.next(result);
    }

    public _setWindowElement (element: HTMLDivElement): void {
        this._windowElement$.next(element);
    }

}
