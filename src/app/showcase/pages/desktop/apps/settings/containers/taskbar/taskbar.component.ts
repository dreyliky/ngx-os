import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DropdownValueChangeEvent } from 'ngx-os/modules';
import {
    TaskbarPlacement,
    TaskbarPlacementEnum,
    TaskbarPlacementService,
    TASKBAR_PLACEMENT_ARRAY
} from '../../../../modules/taskbar';

@Component({
    selector: 'settings-taskbar-section',
    templateUrl: './taskbar.component.html',
    styleUrls: ['./taskbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskbarComponent implements OnInit {
    public readonly placements = TASKBAR_PLACEMENT_ARRAY;
    public selectedPlacement: TaskbarPlacement;

    constructor(
        private readonly taskbarPlacementService: TaskbarPlacementService
    ) {}

    public ngOnInit(): void {
        this.selectedPlacement = this.taskbarPlacementService.data;
    }

    public onPlacementChange({ value }: DropdownValueChangeEvent<TaskbarPlacementEnum>): void {
        this.taskbarPlacementService.change(value);

        this.selectedPlacement = this.taskbarPlacementService.data;
    }
}
