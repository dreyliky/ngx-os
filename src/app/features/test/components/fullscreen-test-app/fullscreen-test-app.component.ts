import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { DynamicWindowConfig, DynamicWindowRef } from 'os-angular';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-fullscreen-test-app',
    templateUrl: './fullscreen-test-app.component.html',
    styleUrls: ['./fullscreen-test-app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FullscreenTestAppComponent implements OnInit, OnDestroy {
    public isWindowFullscreen: boolean;

    private readonly _subscriptions: Subscription[] = [];

    constructor(
        private readonly config: DynamicWindowConfig,
        private readonly windowRef: DynamicWindowRef,
        private readonly changeDetector: ChangeDetectorRef
    ) {}

    public ngOnInit(): void {
        this.initOnCloseConfirmation();

        this.initWindowFullscreenStateObserver();
    }

    public ngOnDestroy(): void {
        this._subscriptions.forEach((subscription) => {
            subscription.unsubscribe();
        });
    }

    public onToggleTitleBarButtonClick(): void {
        this.windowRef.updateConfig({
            isTitleBarVisible: !this.windowRef.config.isTitleBarVisible
        });
    }

    public onToggleFullscreenButtonClick(): void {
        this.windowRef.setFullscreenState(!this.isWindowFullscreen);
    }

    public onCloseButtonClick(): void {
        this.windowRef.close();
    }

    private initOnCloseConfirmation(): void {
        this.windowRef.updateConfig({
            onCloseButtonClick: () => {
                const confirmationResult = confirm('Do you really want close this app?');

                if (confirmationResult) {
                    this.windowRef.close();
                }
            }
        });
    }

    private initWindowFullscreenStateObserver(): void {
        const subscription = this.windowRef.isFullscreen$
            .subscribe((state) => {
                this.isWindowFullscreen = state;

                this.changeDetector.markForCheck();
            });

        this._subscriptions.push(subscription);
    }
}
