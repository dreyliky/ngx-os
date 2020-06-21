import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { TreeNode, DynamicWindowService } from 'projects/os-angular/src/lib';
import { HelloWorldWindowComponent, DemoWindowComponent } from './features/test';
import { BrowserComponent } from './features/browser';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

    constructor (
        private readonly windowService: DynamicWindowService
    ) {}

    public ngOnInit (): void {
        this.windowService.open(
            HelloWorldWindowComponent,
            {
                data: 'There is custom data for window!',
                positionX: '70px',
                positionY: '550px'
            }
        );

        this.windowService.open(
            DemoWindowComponent,
            {
                title: 'OS components overview',
                positionX: '50px',
                positionY: '50px'
            }
        );

        this.windowService.open(
            DemoWindowComponent,
            {
                title: 'Demo',
                height: '250px',
                positionX: '500px',
                positionY: '50px'
            }
        );
    }

}
