import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ComponentMetaInfo } from '@features/documentation';
import { Subscription } from 'rxjs';
import { OverviewService } from '../../overview.service';

@Component({
    selector: 'showcase-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {
    public metaInfo: ComponentMetaInfo;

    public get sourceCodeLink(): string {
        return `https://github.com/dreyliky/ngx-os/tree/master/src/app/library/modules/${this.metaInfo.type}`;
    }

    private metaInfoSubscription: Subscription;

    constructor(
        private readonly overviewService: OverviewService,
        private readonly changeDetector: ChangeDetectorRef
    ) {}

    public ngOnInit(): void {
        this.initMetaInfoObserver();
    }

    public ngOnDestroy(): void {
        this.metaInfoSubscription.unsubscribe();
    }

    private initMetaInfoObserver(): void {
        this.metaInfoSubscription = this.overviewService.metaInfo$
            .subscribe((metaInfo) => {
                this.metaInfo = metaInfo;

                this.changeDetector.detectChanges();
            });
    }
}
