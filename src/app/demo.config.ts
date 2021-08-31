import { Injectable } from '@angular/core';
import { DemoDocService, LibDocService } from '@Features/doc';
import { forkJoin } from 'rxjs';

@Injectable()
export class DemoConfig {
    constructor(
        private readonly libDocService: LibDocService,
        private readonly demoDocService: DemoDocService
    ) {}

    public load(): any {
        return forkJoin([
            this.libDocService.update(),
            this.demoDocService.update()
        ])
            .toPromise()
            .catch(() => {
                return true;
            });
    }
}
