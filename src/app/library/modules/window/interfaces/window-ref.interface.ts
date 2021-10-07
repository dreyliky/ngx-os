import { ComponentRef } from '@angular/core';
import { Observable } from 'rxjs';
import { DynamicWindowComponent } from '../components';
import { IDynamicWindowParams } from './params.interface';

/**
 * Public API of DynamicWindowRef.
 *
 * A mediator for manipulating and tracking the states of a dynamic window.
 * It can be used to manipulate the window itself (minimizing, closing, etc.),
 * and to change the config, modify the initial window settings, or change the window data.
 **/
export interface IDynamicWindowRef {
    /** Is the dynamic window hidden */
    isHidden$: Observable<boolean>;
    /** Is the dynamic window at full-screen */
    isFullscreen$: Observable<boolean>;
    /** Is the dynamic window active (means the user works with it right now) */
    isActive$: Observable<boolean>;
    /** Configuration object for the dynamic window */
    config$: Observable<IDynamicWindowParams>;
    /** Emits value when the dynamic window closed */
    afterClosed$: Observable<any>;

    /** Id of the dynamic window */
    id: string;
    /** Is the dynamic window hidden */
    isHidden: boolean;
    /** Is the dynamic window at full-screen */
    isFullscreen: boolean;
    /** Is the dynamic window active (means the user works with it right now) */
    isActive: boolean;
    /** Configuration object for the dynamic window */
    config: IDynamicWindowParams;
    /** The HTML element of the dynamic window */
    windowElement: HTMLElement;
    /** The component rendered inside the dynamic window */
    componentRef: ComponentRef<DynamicWindowComponent>;

    /** Changes the configuration of the dynamic window */
    updateConfig(config: IDynamicWindowParams): void;
    /** Hides dynamic window */
    hide(): void;
    /** Shows dynamic window */
    show(): void;
    /** Makes dynamic window visible or hidden */
    toggleVisibility(state: boolean): void;
    /** Maximizes the dynamic window at full-screen mode */
    goFullscreen(): void;
    /** Minimizes the dynamic window at windowed mode */
    goWindowed(): void;
    /** Makes dynamic window full-screen or windowed mode */
    toggleFullscreen(state: boolean): void;
    /** Closes the dynamic window */
    close<T>(result?: T): void;
}
