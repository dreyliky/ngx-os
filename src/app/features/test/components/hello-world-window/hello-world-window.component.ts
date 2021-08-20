import { Component } from '@angular/core';
import { DynamicWindowConfig, DynamicWindowRef } from 'os-angular';

@Component({
    selector: 'app-hello-world-window',
    templateUrl: './hello-world-window.component.html',
    styleUrls: ['./hello-world-window.component.scss']
})
export class HelloWorldWindowComponent {
    public data: string;

    constructor(
        private readonly config: DynamicWindowConfig<string>,
        private readonly windowRef: DynamicWindowRef
    ) {
        this.data = this.config.data;
    }

    public onDestroyButtonClick(): void {
        this.windowRef.close();
    }
}
