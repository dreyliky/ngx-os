import { Injectable } from '@angular/core';
import { DynamicWindowControlService } from '../../services/dynamic-window-control.service';

// FIXME: Think how I can remove this service,
// and use DynamicWindowControlService directly in DynamicWindowComponent
// without circular dependency between them
@Injectable()
export class DynamicWindowInstanceService {
    constructor(
        public readonly control: DynamicWindowControlService
    ) {}
}
