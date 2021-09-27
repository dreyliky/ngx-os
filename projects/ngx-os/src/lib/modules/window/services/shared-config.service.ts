import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DynamicWindowConfig } from '../classes';
import { mergeConfigs } from '../helpers';
import { IDynamicWindowParams } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class DynamicWindowSharedConfigService {
    public get data$(): Observable<IDynamicWindowParams> {
        return this._data$.asObservable();
    }

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

    public update(updatedConfig: IDynamicWindowParams): void {
        this._data$.next(mergeConfigs(updatedConfig, this.data));
    }

    public clear(): void {
        this._data$.next({});
    }
}
