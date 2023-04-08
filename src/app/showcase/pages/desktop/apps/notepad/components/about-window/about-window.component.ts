import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { DynamicWindowRef, DYNAMIC_WINDOW_REF } from 'ngx-os';
import { environment } from 'src/environments/environment';
import { NOTEPAD_APP } from '../../data';

@Component({
    selector: 'notepad-about-window',
    templateUrl: './about-window.component.html',
    styleUrls: ['./about-window.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutWindowComponent {
    public metadata = NOTEPAD_APP;

    public get version(): string {
        return environment.version;
    }

    constructor(
        @Inject(DYNAMIC_WINDOW_REF) private windowRef: DynamicWindowRef
    ) {}

    public onOkButtonClick(): void {
        this.windowRef.close();
    }
}
