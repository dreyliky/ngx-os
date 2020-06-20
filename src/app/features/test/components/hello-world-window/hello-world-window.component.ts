import { Component, OnInit } from '@angular/core';
import { DynamicWindowConfig, DynamicWindowRef } from 'projects/os-angular/src/lib/modules/window/classes';

@Component({
    selector: 'app-hello-world-window',
    templateUrl: './hello-world-window.component.html',
    styleUrls: ['./hello-world-window.component.scss']
})
export class HelloWorldWindowComponent implements OnInit {

    public data: string;

    constructor (
        private readonly config: DynamicWindowConfig<string>,
        private readonly windowRef: DynamicWindowRef
    ) {
        this.data = this.config.data;
    }

    public ngOnInit (): void {}

    public onDestroyButtonClick (): void {
        this.windowRef.close();
    }

}
