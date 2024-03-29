import { ComponentRef } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ɵIdGenerator } from '../../../core';
import type { DraggableDirective } from '../../drag-and-drop';
import type { ResizableDirective } from '../../resizer';
import type { ɵDynamicWindowComponent } from '../components';
import type { DynamicWindowConfig, DynamicWindowRef } from '../interfaces';

/** @internal */
export class ɵDynamicWindowRefModel implements DynamicWindowRef {
    public get isHidden$(): Observable<boolean> {
        return this._isHidden$.asObservable();
    }

    public get isHidden(): boolean {
        return this._isHidden$.getValue();
    }

    public get beforeHidden$(): Observable<unknown> {
        return this._beforeHidden$.asObservable();
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

    public get config$(): Observable<DynamicWindowConfig> {
        return this._config$.asObservable();
    }

    public get config(): DynamicWindowConfig {
        return this._config$.getValue();
    }

    public get id(): string {
        return this._id;
    }

    public get windowElement(): HTMLElement {
        return this._windowElement;
    }

    public get componentRef(): ComponentRef<ɵDynamicWindowComponent> {
        return this._componentRef;
    }

    public get draggableDirective(): DraggableDirective {
        return this._draggableDirective;
    }

    public get resizableDirective(): ResizableDirective {
        return this._resizableDirective;
    }

    private readonly _config$ = new BehaviorSubject<DynamicWindowConfig>({});
    private readonly _isHidden$ = new BehaviorSubject<boolean>(false);
    private readonly _isFullscreen$ = new BehaviorSubject<boolean>(false);
    private readonly _isActive$ = new BehaviorSubject<boolean>(true);
    private readonly _orderIndex$ = new BehaviorSubject<number>(0);
    private readonly _beforeHidden$ = new Subject<boolean>();
    private readonly _afterClosed$ = new Subject<unknown>();

    private readonly _id = ɵIdGenerator.generate();
    private _windowElement: HTMLElement;
    private _draggableDirective: DraggableDirective;
    private _resizableDirective: ResizableDirective;
    private _componentRef: ComponentRef<ɵDynamicWindowComponent>;

    public init(config: DynamicWindowConfig): void {
        this.updateConfig(config);
        this.setIsHiddenState(config.isHiddenByDefault);
        this.setIsFullscreenState(config.isFullscreenByDefault);
    }

    public updateConfig(config: DynamicWindowConfig): void {
        this._config$.next({ ...this.config, ...config });
    }

    public hide(): void {
        if (!this.isHidden) {
            this._beforeHidden$.next(true);
            this._isHidden$.next(true);
            this.makeInactive();
        }
    }

    public show(): void {
        if (this.isHidden) {
            this._isHidden$.next(false);
            this.makeActive();
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

    public close<T = any>(result?: T): void {
        this._afterClosed$.next(result);
    }

    public makeActive(): void {
        if (!this.isActive) {
            this._isActive$.next(true);
        }
    }

    public makeInactive(): void {
        if (this.isActive) {
            this._isActive$.next(false);
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

    public setComponentRef(componentRef: ComponentRef<ɵDynamicWindowComponent>): void {
        if (this._componentRef) {
            throw new Error(`Can't change componentRef`);
        }

        this._componentRef = componentRef;
    }

    public setDraggableDirective(directive: DraggableDirective): void {
        if (this._draggableDirective) {
            throw new Error(`Can't change DraggableDirective`);
        }

        this._draggableDirective = directive;
    }

    public setResizableDirective(directive: ResizableDirective): void {
        if (this._resizableDirective) {
            throw new Error(`Can't change ResizableDirective`);
        }

        this._resizableDirective = directive;
    }

    public destroy(): void {
        this._config$.complete();
        this._isHidden$.complete();
        this._isFullscreen$.complete();
        this._isActive$.complete();
        this._orderIndex$.complete();
        this._beforeHidden$.complete();
        this._afterClosed$.complete();
    }
}
