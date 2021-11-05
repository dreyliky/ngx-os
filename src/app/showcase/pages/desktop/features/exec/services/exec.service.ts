import { Injectable } from '@angular/core';
import { DynamicWindowRef, DynamicWindowService } from 'ngx-os';
import { AppMetadata } from '../interfaces';

@Injectable()
export class ExecService {
    constructor(
        private readonly dynamicWindowService: DynamicWindowService
    ) {}

    public run({ componentRef, windowParams }: AppMetadata, data?: any): DynamicWindowRef {
        return this.dynamicWindowService.open(componentRef(), { ...windowParams, data });
    }
}
