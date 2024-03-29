import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ɵOsBaseViewComponent } from 'ngx-os';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'api-element-header',
    templateUrl: './element-header.component.html',
    styleUrls: ['./element-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ElementHeaderComponent extends ɵOsBaseViewComponent implements OnInit {
    @Input()
    public title: string;

    @Input()
    public iconUrl: string;

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
