import { ComponentRef } from '@angular/core';
import { IdGenerator } from '@lib-helpers';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { DynamicWindowComponent } from '../components';
import { IDynamicWindowParams, IDynamicWindowRef } from '../interfaces';

/** @internal */
export class DynamicWindowRef implements IDynamicWindowRef {
    public get isHidden$(): Observable<boolean> {
        return this._isHidden$.asObservable();
    }

    public get isHidden(): boolean {
        return this._isHidden$.getValue();
    }

    public get isFullscreen$(): Observable<boolean> {
        return this._isFullscreen$.asObservable();
    }

    public get isFullscreen(): boolean {
        return this._isFullscreen$.getValue();
    }

    public get isActive$(): Observable<boolean> {
        return this._isActive$.asObservable();
    }

    public get isActive(): boolean {
        return this._isActive$.getValue();
    }

    public get orderIndex$(): Observable<number> {
        return this._orderIndex$.asObservable();
    }

    public get afterClosed$(): Observable<any> {
        return this._afterClosed$.asObservable();
    }

    public get config$(): Observable<IDynamicWindowParams> {
        return this._config$.asObservable();
    }

    public get config(): IDynamicWindowParams {
        return this._config$.getValue();
    }

    public get windowElement(): HTMLElement {
        return this._windowElement;
    }

    public get id(): string {
        return this._id;
    }

    public get componentRef(): ComponentRef<DynamicWindowComponent> {
        return this._componentRef;
    }

    private readonly _config$ = new BehaviorSubject<IDynamicWindowParams>({});
    private readonly _isHidden$ = new BehaviorSubject<boolean>(false);
    private readonly _isFullscreen$ = new BehaviorSubject<boolean>(false);
    private readonly _isActive$ = new BehaviorSubject<boolean>(true);
    private readonly _orderIndex$ = new BehaviorSubject<number>(0);
    private readonly _afterClosed$ = new Subject<any>();

    private readonly _id = IdGenerator.generate();
    private _windowElement: HTMLElement;
    private _componentRef: ComponentRef<DynamicWindowComponent>;

    public init(config: IDynamicWindowParams): void {
        this.updateConfig(config);
        this.setIsHiddenState(config.isHiddenByDefault);
        this.setIsFullscreenState(config.isFullscreenByDefault);
    }

    public updateConfig(config: IDynamicWindowParams): void {
        this._config$.next({ ...this.config, ...config });
    }

    public hide(): void {
        if (!this.isHidden) {
            this._isHidden$.next(true);
            this.setIsActive(false);
        }
    }

    public show(): void {
        if (this.isHidden) {
            this._isHidden$.next(false);
            this.setIsActive(true);
        }
    }

    public toggleVisibility(): void {
        (this.isHidden) ? this.show() : this.hide();
    }

    public setIsHiddenState(state: boolean): void {
        (state) ? this.hide() : this.show();
    }

    public goFullscreen(): void {
        if (!this.isFullscreen) {
            this._isFullscreen$.next(true);
        }
    }

    public goWindowed(): void {
        if (this.isFullscreen) {
            this._isFullscreen$.next(false);
        }
    }

    public toggleFullscreen(): void {
        (this.isFullscreen) ? this.goWindowed() : this.goFullscreen();
    }

    public setIsFullscreenState(state: boolean): void {
        (state) ? this.goFullscreen() : this.goWindowed();
    }

    public close<T>(result?: T): void {
        this._afterClosed$.next(result);
    }

    public setIsActive(state: boolean): void {
        if (this.isActive !== state) {
            this._isActive$.next(state);
        }
    }

    public setOrderIndex(orderIndex: number): void {
        this._orderIndex$.next(orderIndex);
    }

    public setWindowElement(element: HTMLElement): void {
        if (this._windowElement) {
            throw new Error(`Can't change windowElement`);
        }

        this._windowElement = element;
    }

    public setComponentRef(componentRef: ComponentRef<DynamicWindowComponent>): void {
        if (this._componentRef) {
            throw new Error(`Can't change componentRef`);
        }

        this._componentRef = componentRef;
    }

    public destroy(): void {
        this._config$.complete();
        this._isHidden$.complete();
        this._isFullscreen$.complete();
        this._isActive$.complete();
        this._orderIndex$.complete();
        this._afterClosed$.complete();
    }
}
