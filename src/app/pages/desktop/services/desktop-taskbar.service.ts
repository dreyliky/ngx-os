import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TaskbarPlacementService } from '../modules';

@Injectable()
export class DesktopTaskbarService {
    public get classlist$(): Observable<string> {
        return this.taskbarPlacementService.data$
            .pipe(
                map((placement) => placement.cssClassName)
            );
    }

    constructor(
        private readonly taskbarPlacementService: TaskbarPlacementService
    ) {}
}
