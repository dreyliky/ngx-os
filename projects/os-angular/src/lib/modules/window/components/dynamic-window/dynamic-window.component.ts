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
import { HtmlElementDragAndDrop } from 'projects/os-angular/src/lib/helpers';

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

    @ViewChild(DynamicWindowContentDirective, { static: true })
    public dynamicWindowContent: DynamicWindowContentDirective;

    @ViewChild(WindowComponent, { static: true })
    private readonly _windowComponent: WindowComponent;

    private _childComponentRef: ComponentRef<any>;

    private _windowElement: HTMLDivElement;
    private _titleBarElement: HTMLDivElement;

    private _titleDragAndDrop: HtmlElementDragAndDrop;

    constructor (
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

        this._titleDragAndDrop.destroy();
    }

    public ngAfterViewInit (): void {
        this.loadChildComponent(this.childComponentType);

        this.initHtmlElements();
        this.initTitleDragAndDrop();

        this.changeDetector.detectChanges();
    }

    public onCloseButtonClick (): void {
        this.windowRef.close();
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

}
