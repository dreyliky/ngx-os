import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RESIZERS_ARRAY } from '../../resizer';
import { DynamicWindowConfig } from '../classes';
import { mergeConfigs } from '../helpers';
import { IDynamicWindowParams } from '../interfaces';

/** Allows manipulation with shared config for all windows */
@Injectable({
    providedIn: 'root'
})
export class DynamicWindowSharedConfigService {
    /** Contains shared config */
    public get data$(): Observable<IDynamicWindowParams> {
        return this._data$.asObservable();
    }

    /** Contains shared config */
    public get data(): IDynamicWindowParams {
        return this._data$.getValue();
    }

    private readonly _data$ = new BehaviorSubject<IDynamicWindowParams>(
        new DynamicWindowConfig({
            title: 'OS dynamic window',
            minWidth: 275,
            minHeight: 175,
            maxWidth: Infinity,
            maxHeight: Infinity,
            fullscreenOffset: {
                top: '0px',
                bottom: '0px',
                left: '0px',
                right: '0px'
            },
            hidesInto: {
                x: '50%',
                y: '100%'
            },
            allowedResizers: [...RESIZERS_ARRAY],
            isFullscreenByDefault: false,
            isHiddenByDefault: false,
            isAllowHide: true,
            isAllowFullscreen: true,
            isAllowClose: true,
            isAlwaysOnTop: false,
            isToggleFullscreenByDblClickOnTitleBar: true,
            isExitFullscreenByDragTitleBar: true,
            isTitleBarVisible: true,
            style: {},
            styleClass: '',
            titleBarStyle: {},
            titleBarStyleClass: '',
            scrollViewStyle: {},
            scrollViewStyleClass: ''
        })
    );

    /** Overrides some part of config on the new one */
    public update(config: IDynamicWindowParams): void {
        this._data$.next(mergeConfigs(config, this.data));
    }

    /** Cleans the shared config completely */
    public clear(): void {
        this._data$.next({});
    }
}
