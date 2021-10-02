import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'api-element-header',
    templateUrl: './element-header.component.html',
    styleUrls: ['./element-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ElementHeaderComponent implements OnInit {
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
    ) {}

    public ngOnInit(): void {
        this.initRouteFragmentObserver();
    }

    private initRouteFragmentObserver(): void {
        this.activatedRoute.fragment
            .subscribe((fragment) => {
                this.routeFragment = fragment;

                this.changeDetector.detectChanges();
            });
    }
}
