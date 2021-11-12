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

/** Allows to hide HTML elements for specific themes */
@Directive({
    selector: '[forbiddenForOs]'
})
export class ForbiddenForOsDirective<T> implements OnInit, OnDestroy {
    /** An array of theme names for which will be hidden the wrapped HTML element */
    @Input('forbiddenForOs')
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
        const isForbidden = !!this.themes?.includes(appliedTheme);

        if (this.isViewCreated && isForbidden) {
            this.viewContainerRef.clear();
        }

        if (!this.isViewCreated && !isForbidden) {
            this.viewContainerRef.createEmbeddedView(this.templateRef);
        }

        this.isViewCreated = !isForbidden;

        this.changeDetector.markForCheck();
    }
}
