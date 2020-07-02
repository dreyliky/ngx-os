import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ListItem } from 'projects/os-angular/src/lib/modules/list/interfaces/item.interface';
import { DynamicWindowService } from 'projects/os-angular/src/lib';
import { DemoWindowComponent, HelloWorldWindowComponent } from '../test';
import { SurvivWindowComponent } from '../test/components/surviv-window/surviv-window.component';

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
        },
        {
            label: 'Surviv.io',
            iconUrl: 'assets/icons/surviv.png',
            onDblClick: () => this.onSurvivShortcutDblClick()
        }
    ];

    constructor (
        private readonly windowService: DynamicWindowService
    ) {}

    public ngOnInit (): void {
        this.onOsElementsShortcutDblClick();
    }

    public trackByFn = (shortcut: ListItem, index: number): number => {
        return index;
    }

    private onOsElementsShortcutDblClick (): void {
        this.windowService.open(
            DemoWindowComponent,
            {
                title: 'Angular OS - components overview',
                minWidth: 250,
                width: 350,
                height: 450
            }
        );
    }

    private onHelloWorldShortcutDblClick (): void {
        this.windowService.open(
            HelloWorldWindowComponent,
            {
                data: 'There is custom data for window!',
                positionX: 70,
                positionY: 350,
                isExitFullscreenByDragTitle: false
            }
        );
    }

    private onSurvivShortcutDblClick (): void {
        this.windowService.open(
            SurvivWindowComponent,
            {
                title: 'Surviv.io',
                width: 800,
                height: 600,
                isFullscreen: true
            }
        );
    }

}
