import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ISelectboxValueChangeEvent } from '@lib-modules';
import { TaskbarPlacementEnum, TaskbarPlacementService, TASKBAR_PLACEMENT_ARRAY } from '../../../../modules/taskbar';

@Component({
    selector: 'settings-taskbar-section',
    templateUrl: './taskbar.component.html',
    styleUrls: ['./taskbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskbarComponent implements OnInit {
    public readonly placements = TASKBAR_PLACEMENT_ARRAY;
    public selectedPlacement: TaskbarPlacementEnum;

    constructor(
        private readonly taskbarPlacementService: TaskbarPlacementService
    ) {}

    public ngOnInit(): void {
        this.selectedPlacement = this.taskbarPlacementService.data;
    }

    public onPlacementChange({ value }: ISelectboxValueChangeEvent<TaskbarPlacementEnum>): void {
        this.selectedPlacement = value;

        this.taskbarPlacementService.change(value);
    }
}
