import {
    Component,
    OnDestroy,
    AfterViewInit,
    ChangeDetectionStrategy,
    ViewChild,
    ComponentFactoryResolver,
    ComponentRef,
    Type,
    ChangeDetectorRef,
    OnInit,
    HostListener
} from '@angular/core';

import { DynamicWindowContentDirective } from '../../directives';
import { DynamicWindowConfig, DynamicWindowRef } from '../../classes';
import { WindowComponent } from '../../window.component';
import { HtmlElementDragAndDrop, HtmlElementResizing, OutsideClick } from '../../../../helpers';
import { DynamicWindowControlService } from '../../services/dynamic-window-control.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'os-dynamic-window',
    templateUrl: './dynamic-window.component.html',
    styleUrls: ['./dynamic-window.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicWindowComponent implements OnInit, OnDestroy, AfterViewInit {

    public childComponentType: Type<any>;
    public config: DynamicWindowConfig;
    public windowRef: DynamicWindowRef;

    public positionX: string;
    public positionY: string;
    public zIndex: number;
    public isActive: boolean = false;
    public isFullscreen: boolean = false;
    public isHidden: boolean = false;
    public windowIdOrderIndex: number = 0;

    @ViewChild(DynamicWindowContentDirective, { static: true })
    public dynamicWindowContent: DynamicWindowContentDirective;

    @ViewChild(WindowComponent, { static: true })
    private readonly _windowComponent: WindowComponent;

    private readonly _baseZIndex: number = 1000;

    private _childComponentRef: ComponentRef<any>;

    private _windowElement: HTMLDivElement;
    private _titleBarElement: HTMLDivElement;

    private _titleDragAndDrop: HtmlElementDragAndDrop;
    private _windowResizing: HtmlElementResizing;

    private _isHiddenStateSubscription: Subscription;
    private _activeWindowIdSubscription: Subscription;
    private _windowIdOrderSubscription: Subscription;

    constructor (
        private readonly windowControlService: DynamicWindowControlService,
        private readonly componentFactoryResolver: ComponentFactoryResolver,
        private readonly changeDetector: ChangeDetectorRef
    ) {}

    public ngOnInit (): void {
        this.isFullscreen = this.config.isFullscreen;
        this.isHidden = this.config.isHidden;
        this.positionX = this.config.positionX;
        this.positionY = this.config.positionY;
    }

    public ngOnDestroy (): void {
        if (this._childComponentRef) {
            this._childComponentRef.destroy();
        }

        this._isHiddenStateSubscription.unsubscribe();
        this._activeWindowIdSubscription.unsubscribe();
        this._windowIdOrderSubscription.unsubscribe();

        this._titleDragAndDrop.destroy();
        this._windowResizing.destroy();
    }

    public ngAfterViewInit (): void {
        this.windowControlService.setActiveStateForWindowId(this._windowComponent.id);

        this.loadChildComponent(this.childComponentType);

        this.initHtmlElements();
        this.initTitleDragAndDrop();
        this.initWindowResizing();

        this.initIsHiddenStateObserver();
        this.initActiveWindowIdObserver();
        this.initWindowIdOrderObserver();

        this.changeDetector.detectChanges();
    }

    @HostListener('document:click', ['$event'])
    public onClickOutside (event: MouseEvent): void {
        const isClickOutsideWindow = OutsideClick.checkForElement(this._windowElement, event);

        if (isClickOutsideWindow && this.isActive) {
            this.windowControlService.setActiveStateForWindowId(null);
        }
    }

    public onMinimizeButtonClick (): void {
        this.windowRef.hide();
    }

    public onMaximizeButtonClick (): void {
        this.isFullscreen = !this.isFullscreen;
    }

    public onCloseButtonClick (): void {
        this.windowRef.close();
    }

    public onWindowMouseDown (): void {
        this.windowControlService.setActiveStateForWindowId(this._windowComponent.id);
    }

    private updateZIndex (): void {
        this.zIndex = (this._baseZIndex + this.windowIdOrderIndex);

        this.changeDetector.detectChanges();
    }

    private loadChildComponent (componentType: Type<any>): void {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);
        const viewContainerRef = this.dynamicWindowContent.viewContainerRef;

        viewContainerRef.clear();

        this._childComponentRef = viewContainerRef.createComponent(componentFactory);
    }

    private initHtmlElements (): void {
        this._windowElement = document.getElementById(this._windowComponent.id) as HTMLDivElement;
        this._titleBarElement = this._windowElement.querySelector('.os-title-bar');
    }

    private initTitleDragAndDrop (): void {
        this._titleDragAndDrop = new HtmlElementDragAndDrop(this._titleBarElement);

        this._titleDragAndDrop.coords$
            .subscribe((coords) => {
                if (!this.isFullscreen) {
                    this.positionX = `${coords.left}px`;
                    this.positionY = `${coords.top}px`;

                    this.changeDetector.markForCheck();
                }
            });
    }

    private initWindowResizing (): void {
        this._windowResizing = new HtmlElementResizing(this._windowElement);
    }

    private initActiveWindowIdObserver (): void {
        this._activeWindowIdSubscription = this.windowControlService.activeWindowId$
            .subscribe((activeWindowId) => {
                this.isActive = (activeWindowId === this._windowComponent.id);

                this.updateZIndex();
            });
    }

    private initWindowIdOrderObserver (): void {
        this._windowIdOrderSubscription = this.windowControlService.windowIdsOrder$
            .subscribe((orderedWindowIds) => {
                this.windowIdOrderIndex = orderedWindowIds
                    .findIndex((currWindowId) => currWindowId === this._windowComponent.id);

                this.updateZIndex();
            });
    }

    private initIsHiddenStateObserver (): void {
        this._isHiddenStateSubscription = this.windowRef.isHidden$
            .subscribe((state) => {
                this.isHidden = state;

                this.changeDetector.detectChanges();
            });
    }

}
