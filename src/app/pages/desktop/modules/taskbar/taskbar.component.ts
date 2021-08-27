import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DynamicWindowRef, DynamicWindowService } from '@lib-modules';

@Component({
    selector: 'desktop-taskbar',
    templateUrl: './taskbar.component.html',
    styleUrls: ['./taskbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskbarComponent implements OnInit {
    public windowsRef: DynamicWindowRef[];

    constructor(
        private readonly dynamicWindowService: DynamicWindowService,
        private readonly changeDetector: ChangeDetectorRef
    ) {}

    public ngOnInit(): void {
        this.dynamicWindowService.references$
            .subscribe((windowsRef) => {
                this.windowsRef = windowsRef;

                this.changeDetector.detectChanges();
            });
    }

    public onWindowReferenceIconClick(event: PointerEvent, windowRef: DynamicWindowRef): void {
        if (!windowRef.isHidden && !windowRef.isActive) {
            windowRef.setIsActive(true);
        } else {
            windowRef.toggleVisibility();
        }

        // Disable outside click checking for window (which removes active state)
        event.stopPropagation();
    }
}
