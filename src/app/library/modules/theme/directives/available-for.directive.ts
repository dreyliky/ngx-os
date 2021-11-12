import {
    ChangeDetectorRef,
    Directive,
    Input,
    OnDestroy,
    OnInit,
    TemplateRef,
    ViewContainerRef
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemeService } from '../services';

/** Allows to display HTML elements for specific themes */
@Directive({
    selector: '[osAvailableFor]'
})
export class AvailableForOsDirective<T = any> implements OnInit, OnDestroy {
    /** An array of theme names for which will be displayed the wrapped HTML element */
    @Input('osAvailableFor')
    private themes: T[];

    private isViewCreated = false;
    private themeSubscription: Subscription;

    constructor(
        private readonly templateRef: TemplateRef<any>,
        private readonly viewContainerRef: ViewContainerRef,
        private readonly themeService: ThemeService<T>,
        private readonly changeDetector: ChangeDetectorRef
    ) {}

    public ngOnInit(): void {
        this.themeSubscription = this.themeService.applied$
            .subscribe((data) => this.processElement(data));
    }

    public ngOnDestroy(): void {
        this.themeSubscription.unsubscribe();
    }

    private processElement(appliedTheme: T): void {
        const isAvailable = !!this.themes?.includes(appliedTheme);

        if (this.isViewCreated && !isAvailable) {
            this.viewContainerRef.clear();
        }

        if (!this.isViewCreated && isAvailable) {
            this.viewContainerRef.createEmbeddedView(this.templateRef);
        }

        this.isViewCreated = isAvailable;

        this.changeDetector.markForCheck();
    }
}
