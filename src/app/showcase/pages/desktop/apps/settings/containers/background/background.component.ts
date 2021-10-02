import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit
} from '@angular/core';
import { BackgroundMetadata, BackgroundService } from '../../../../features/background';
import { BackgroundControlService } from './services';

@Component({
    selector: 'settings-background-section',
    templateUrl: './background.component.html',
    styleUrls: ['./background.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        BackgroundControlService
    ]
})
export class BackgroundComponent implements OnInit {
    public currentBackground: BackgroundMetadata;

    constructor(
        private readonly backgroundService: BackgroundService,
        private readonly changeDetector: ChangeDetectorRef
    ) {}

    public ngOnInit(): void {
        this.initBackgroundObserver();
    }

    private initBackgroundObserver(): void {
        this.backgroundService.data$
            .subscribe((currentBackground) => {
                this.currentBackground = currentBackground;

                this.changeDetector.detectChanges();
            });
    }
}
