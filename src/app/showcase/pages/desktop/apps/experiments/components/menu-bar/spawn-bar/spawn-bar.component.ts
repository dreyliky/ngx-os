import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GroupActionService } from '../../../services';

@Component({
    selector: 'experiments-spawn-bar',
    templateUrl: './spawn-bar.component.html',
    styleUrls: ['./spawn-bar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpawnBarComponent {
    public readonly windowAmountToSpawnArray: number[] = [
        5, 10, 25, 50, 100, 200, 400
    ];

    constructor(
        private readonly groupActionService: GroupActionService
    ) {}

    public onSpawnWindowsButtonClick(amount: number): void {
        this.groupActionService.spawnWindows(amount);
    }
}
