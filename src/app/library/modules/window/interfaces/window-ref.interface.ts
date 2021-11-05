import { ComponentRef } from '@angular/core';
import { Observable } from 'rxjs';
import { DraggableDirective } from '../../drag-and-drop';
import { ResizableDirective } from '../../resizer';
import { DynamicWindowComponent } from '../components';
import { DynamicWindowConfig } from './config.interface';

/**
 * Public API of DynamicWindowRef.
 *
 * A mediator for manipulating and tracking the states of a dynamic window.
 * It can be used to manipulate the window itself (minimizing, closing, etc.),
 * and to change the config, modify the initial window settings, or change the window data.
 **/
export interface DynamicWindowRef {
    /** Is the dynamic window hidden */
    isHidden$: Observable<boolean>;
    /** Is the dynamic window at full-screen */
    isFullscreen$: Observable<boolean>;
    /** Is the dynamic window active (means the user works with it right now) */
    isActive$: Observable<boolean>;
    /** Configuration object for the dynamic window */
    config$: Observable<DynamicWindowConfig>;
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
    config: DynamicWindowConfig;
    /** The HTML element of the dynamic window */
    windowElement: HTMLElement;
    /** The component rendered inside the dynamic window */
    componentRef: ComponentRef<DynamicWindowComponent>;
    /** {@link DraggableDirective} of the dynamic window. Might be used to track events */
    dragger: DraggableDirective;
    /** {@link ResizableDirective} of the dynamic window. Might be used to track events */
    resizer: ResizableDirective;

    /** Changes the configuration of the dynamic window */
    updateConfig(config: DynamicWindowConfig): void;
    /** Hides dynamic window */
    hide(): void;
    /** Shows dynamic window */
    show(): void;
    /** Makes dynamic window visible or hidden */
    toggleVisibility(): void;
    /** Maximizes the dynamic window at full-screen mode */
    goFullscreen(): void;
    /** Minimizes the dynamic window at windowed mode */
    goWindowed(): void;
    /** Makes dynamic window full-screen or windowed mode */
    toggleFullscreen(): void;
    /** Closes the dynamic window */
    close<T>(result?: T): void;
}
