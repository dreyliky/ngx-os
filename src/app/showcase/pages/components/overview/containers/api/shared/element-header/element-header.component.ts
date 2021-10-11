import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OsBaseViewComponent } from 'ngx-os';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'api-element-header',
    templateUrl: './element-header.component.html',
    styleUrls: ['./element-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ElementHeaderComponent extends OsBaseViewComponent implements OnInit {
    @Input()
    public readonly title: string;

    @Input()
    public readonly iconUrl: string;

    public get isActiveByRouteFragment(): boolean {
        return (this.title === this.routeFragment);
    }

    private routeFragment: string;

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly changeDetector: ChangeDetectorRef
    ) {
        super();
    }

    public ngOnInit(): void {
        this.initRouteFragmentObserver();
    }

    private initRouteFragmentObserver(): void {
        this.activatedRoute.fragment
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe((fragment) => {
                this.routeFragment = fragment;

                this.changeDetector.detectChanges();
            });
    }
}
