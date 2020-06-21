import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ListItem } from 'projects/os-angular/src/lib/modules/list/interfaces/item.interface';
import { DynamicWindowService } from 'projects/os-angular/src/lib';
import { DemoWindowComponent, HelloWorldWindowComponent } from '../test';

@Component({
    selector: 'app-desktop',
    templateUrl: './desktop.component.html',
    styleUrls: ['./desktop.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DesktopComponent implements OnInit {

    public shortcuts: ListItem[] = [
        {
            label: 'Os Elements',
            iconUrl: 'assets/icons/my-pc.png',
            onDblClick: () => this.onOsElementsShortcutDblClick()
        },
        {
            label: 'Hello World',
            iconUrl: 'assets/icons/folder-opened.png',
            onDblClick: () => this.onHelloWorldShortcutDblClick()
        },
        {
            label: 'Calculator',
            iconUrl: 'assets/icons/calculator.png',
            onDblClick: () => alert("Calculator")
        }
    ];

    constructor (
        private readonly windowService: DynamicWindowService
    ) {}

    public ngOnInit (): void {}

    public trackByFn = (shortcut: ListItem, index: number): number => {
        return index;
    }

    private onOsElementsShortcutDblClick (): void {
        this.windowService.open(
            DemoWindowComponent,
            {
                title: 'OS components overview',
                positionX: '175px',
                positionY: '50px'
            }
        );
    }

    private onHelloWorldShortcutDblClick (): void {
        this.windowService.open(
            HelloWorldWindowComponent,
            {
                data: 'There is custom data for window!',
                positionX: '70px',
                positionY: '550px'
            }
        );
    }

}
