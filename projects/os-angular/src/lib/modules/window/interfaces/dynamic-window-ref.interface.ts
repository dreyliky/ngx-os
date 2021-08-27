import { ComponentRef } from '@angular/core';
import { Observable } from 'rxjs';
import { DynamicWindowComponent } from '../components';
import { DynamicWindowParams } from './dynamic-window-params.interface';

/** Public API of DynamicWindowRef */
export interface IDynamicWindowRef {
    isHidden$: Observable<boolean>;
    isFullscreen$: Observable<boolean>;
    isActive$: Observable<boolean>;
    afterClosed$: Observable<any>;
    config$: Observable<DynamicWindowParams>;

    id: string;
    isHidden: boolean;
    isFullscreen: boolean;
    isActive: boolean;
    config: DynamicWindowParams;
    windowElement: HTMLElement;
    componentRef: ComponentRef<DynamicWindowComponent>;

    updateConfig(config: DynamicWindowParams): void;
    hide(): void;
    show(): void;
    setIsHiddenState(state: boolean): void;
    goFullscreen(): void;
    goWindowed(): void;
    setFullscreenState(state: boolean): void;
    close<T>(result?: T): void;
}
