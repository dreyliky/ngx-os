import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DynamicWindowRef, ɵKeysOfType } from 'ngx-os';
import { GroupActionService } from '../../../services';

@Component({
    selector: 'experiments-group-actions-bar',
    templateUrl: './group-actions-bar.component.html',
    styleUrls: ['./group-actions-bar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupActionsBarComponent {
    constructor(
        private readonly groupActionService: GroupActionService
    ) {}

    public onShuffleButtonClick(): void {
        this.groupActionService.shuffleWindowsPositions();
    }

    public makeGroupWindowsAction(action: ɵKeysOfType<DynamicWindowRef, () => any>): void {
        this.groupActionService.makeGroupWindowsAction(action);
    }
}
