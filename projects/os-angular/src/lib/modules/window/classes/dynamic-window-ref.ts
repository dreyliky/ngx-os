import { Observable, Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { DynamicWindowConfig } from './dynamic-window-config';

export class DynamicWindowRef {

    public get isHidden$ (): Observable<boolean> {
        return this._isHidden$.asObservable();
    }

    public get isHidden (): boolean {
        return this._isHidden$.getValue();
    }

    public get afterClosed$ (): Observable<any> {
        return this._afterClosed$.asObservable();
    }

    public get config$ (): Observable<DynamicWindowConfig> {
        return this._config$;
    }

    public get config (): DynamicWindowConfig {
        return this._config$.getValue();
    }

    private readonly _config$ = new BehaviorSubject<DynamicWindowConfig>({});
    private readonly _isHidden$ = new BehaviorSubject<boolean>(false);
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

    public close (result?: any): void {
        this._afterClosed$.next(result);
    }

}
