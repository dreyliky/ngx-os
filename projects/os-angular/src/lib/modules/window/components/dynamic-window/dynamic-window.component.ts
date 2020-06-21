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
    OnInit
} from '@angular/core';

import { DynamicWindowContentDirective } from '../../directives';
import { DynamicWindowConfig, DynamicWindowRef } from '../../classes';
import { WindowComponent } from '../../window.component';
import { HtmlElementDragAndDrop } from '../../../../helpers';
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
    public windowIdOrderIndex: number = 0;

    @ViewChild(DynamicWindowContentDirective, { static: true })
    public dynamicWindowContent: DynamicWindowContentDirective;

    @ViewChild(WindowComponent, { static: true })
    private readonly _windowComponent: WindowComponent;

    private readonly _baseZIndex: number = 1000;
    private readonly _baseActiveWindowZIndex: number = 1000;

    private _childComponentRef: ComponentRef<any>;

    private _windowElement: HTMLDivElement;
    private _titleBarElement: HTMLDivElement;

    private _titleDragAndDrop: HtmlElementDragAndDrop;

    private _activeWindowIdSubscription: Subscription;
    private _windowIdOrderSubscription: Subscription;

    constructor (
        private readonly windowControlService: DynamicWindowControlService,
        private readonly componentFactoryResolver: ComponentFactoryResolver,
        private readonly changeDetector: ChangeDetectorRef
    ) {}

    public ngOnInit (): void {
        this.positionX = this.config.positionX;
        this.positionY = this.config.positionY;
    }

    public ngOnDestroy (): void {
        if (this._childComponentRef) {
            this._childComponentRef.destroy();
        }

        if (this._activeWindowIdSubscription) {
            this._activeWindowIdSubscription.unsubscribe();
        }

        this._titleDragAndDrop.destroy();
    }

    public ngAfterViewInit (): void {
        this.windowControlService.setActiveStateForWindowId(this._windowComponent.id);

        this.loadChildComponent(this.childComponentType);

        this.initHtmlElements();
        this.initTitleDragAndDrop();
        this.initActiveWindowIdObserver();
        this.initWindowIdOrderObserver();

        this.changeDetector.detectChanges();
    }

    public onCloseButtonClick (): void {
        this.windowRef.close();
    }

    public onWindowMouseDown (): void {
        this.windowControlService.setActiveStateForWindowId(this._windowComponent.id);
    }

    private updateZIndex (): void {
        let calculatedZIndex: number = this._baseZIndex;

        calculatedZIndex += this.windowIdOrderIndex;

        if (this.isActive) {
            calculatedZIndex += this._baseActiveWindowZIndex;
        }

        this.zIndex = calculatedZIndex;

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
        this._titleBarElement = this._windowElement.querySelector('.title-bar');
    }

    private initTitleDragAndDrop (): void {
        this._titleDragAndDrop = new HtmlElementDragAndDrop(this._titleBarElement);

        this._titleDragAndDrop.coords$
            .subscribe((coords) => {
                this.positionX = `${coords.left}px`;
                this.positionY = `${coords.top}px`;

                this.changeDetector.markForCheck();
            });
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

}
