import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'showcase-utils-append-to-body-overview',
    templateUrl: './utils-append-to-body-overview.component.html',
    styleUrls: ['./utils-append-to-body-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UtilsAppendToBodyOverviewComponent {
    public isContainerVisible = false;

    public get labelOfToggleVisibilityButton(): string {
        const action = (this.isContainerVisible) ? 'Hide' : 'Show';

        return `${action} container`;
    }

    public get containerStyles(): object {
        return {
            display: (this.isContainerVisible) ? '' : 'none'
        };
    }

    public onToggleContainerVisibilityButtonClick(): void {
        this.isContainerVisible = !this.isContainerVisible;
    }
}
