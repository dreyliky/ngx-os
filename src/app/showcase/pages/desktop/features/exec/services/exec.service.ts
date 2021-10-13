import { Injectable } from '@angular/core';
import { DynamicWindowRefModel, DynamicWindowService } from 'ngx-os/modules';
import { AppMetadata } from '../interfaces';

@Injectable()
export class ExecService {
    constructor(
        private readonly dynamicWindowService: DynamicWindowService
    ) {}

    public run({ component, windowParams }: AppMetadata): DynamicWindowRefModel {
        return this.dynamicWindowService.open(component, windowParams);
    }
}
