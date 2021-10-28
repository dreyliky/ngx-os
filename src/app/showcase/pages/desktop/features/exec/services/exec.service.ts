import { Injectable } from '@angular/core';
import { DynamicWindowRefModel, DynamicWindowService } from 'ngx-os';
import { AppMetadata } from '../interfaces';

@Injectable()
export class ExecService {
    constructor(
        private readonly dynamicWindowService: DynamicWindowService
    ) {}

    public run({ componentRef, windowParams }: AppMetadata, data?: any): DynamicWindowRefModel {
        return this.dynamicWindowService.open(componentRef(), { ...windowParams, data });
    }
}
