import { ComponentRef } from '@angular/core';
import { Observable } from 'rxjs';
import { DynamicWindowComponent } from '../components';
import { IDynamicWindowParams } from './dynamic-window-params.interface';

/** Public API of DynamicWindowRef */
export interface IDynamicWindowRef {
    isHidden$: Observable<boolean>;
    isFullscreen$: Observable<boolean>;
    isActive$: Observable<boolean>;
    afterClosed$: Observable<any>;
    config$: Observable<IDynamicWindowParams>;

    id: string;
    isHidden: boolean;
    isFullscreen: boolean;
    isActive: boolean;
    config: IDynamicWindowParams;
    windowElement: HTMLElement;
    componentRef: ComponentRef<DynamicWindowComponent>;

    updateConfig(config: IDynamicWindowParams): void;
    hide(): void;
    show(): void;
    toggleVisibility(state: boolean): void;
    goFullscreen(): void;
    goWindowed(): void;
    toggleFullscreen(state: boolean): void;
    close<T>(result?: T): void;
}
