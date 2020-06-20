import {
    Component,
    OnInit,
    OnDestroy,
    AfterViewInit,
    ChangeDetectionStrategy,
    ViewChild,
    ComponentFactoryResolver,
    ComponentRef,
    Type,
    ChangeDetectorRef
} from '@angular/core';

import { DynamicWindowContentDirective } from '../../directives';

@Component({
    selector: 'os-dynamic-window',
    templateUrl: './dynamic-window.component.html',
    styleUrls: ['./dynamic-window.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicWindowComponent implements OnInit, OnDestroy, AfterViewInit {

    public componentRef: ComponentRef<any>;
    public childComponentType: Type<any>;

    @ViewChild(DynamicWindowContentDirective)
    public dynamicWindowContent: DynamicWindowContentDirective;

    constructor (
        private readonly componentFactoryResolver: ComponentFactoryResolver,
        private readonly changeDetector: ChangeDetectorRef
    ) {}

    public ngOnInit (): void {}

    public ngOnDestroy (): void {
        if (this.componentRef) {
            this.componentRef.destroy();
        }
    }

    public ngAfterViewInit (): void {
        this.loadChildComponent(this.childComponentType);

        this.changeDetector.detectChanges();
    }

    private loadChildComponent (componentType: Type<any>): void {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);

        const viewContainerRef = this.dynamicWindowContent.viewContainerRef;
        viewContainerRef.clear();

        this.componentRef = viewContainerRef.createComponent(componentFactory);
    }

}
