import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicWindowRef } from 'ngx-os/modules';

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
        private readonly windowRef: DynamicWindowRef
    ) {}

    public onConfirmButtonClick(): void {
        this.windowRef.close();
        this.router.navigateByUrl('/');
    }

    public onCancelButtonClick(): void {
        this.windowRef.close();
    }
}
