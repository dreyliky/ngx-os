import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { TreeNode, DynamicWindowService } from 'projects/os-angular/src/lib';
import { HelloWorldWindowComponent, DemoWindowComponent } from './features/test';

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
        this.windowService.open(HelloWorldWindowComponent, { data: 'There is custom data for window!' });

        this.windowService.open(
            DemoWindowComponent,
            {
                title: 'OS components overview',
                positionX: '50px',
                positionY: '50px'
            }
        );

        this.windowService.open(HelloWorldWindowComponent, { data: 'Another window', positionX: '450px', positionY: '100px' });
    }

}
