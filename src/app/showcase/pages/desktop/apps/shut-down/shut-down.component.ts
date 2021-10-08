import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { DYNAMIC_WINDOW_REF, IDynamicWindowRef } from 'ngx-os';

@Component({
    selector: 'showcase-shut-down',
    templateUrl: './shut-down.component.html',
    styleUrls: ['./shut-down.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShutDownAppComponent {
    public get shutdownIconUrl(): string {
        return this.windowRef.config.iconUrl;
    }

    constructor(
        private readonly router: Router,
        @Inject(DYNAMIC_WINDOW_REF) private readonly windowRef: IDynamicWindowRef
    ) {}

    public onConfirmButtonClick(): void {
        this.windowRef.close();
        this.router.navigateByUrl('/');
    }

    public onCancelButtonClick(): void {
        this.windowRef.close();
    }
}
