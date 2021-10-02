import { Injectable } from '@angular/core';
import { DynamicWindowService, IDynamicWindowRef } from 'ngx-os/modules';
import { AppMetadata } from '../interfaces';

@Injectable()
export class ExecService {
    constructor(
        private readonly dynamicWindowService: DynamicWindowService
    ) {}

    public run({ component, windowParams }: AppMetadata): IDynamicWindowRef {
        return this.dynamicWindowService.open(component, windowParams);
    }
}
