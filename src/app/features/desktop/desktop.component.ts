import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GridItem } from 'os-angular/modules/grid/interfaces/item.interface';
import { DynamicWindowService } from 'projects/os-angular/src/lib';
import {
    DemoWin10WindowComponent, DemoWindowComponent,

    FullscreenTestAppComponent, HelloWorldWindowComponent
} from '../test';

@Component({
    selector: 'app-desktop',
    templateUrl: './desktop.component.html',
    styleUrls: ['./desktop.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DesktopComponent implements OnInit {
    public shortcuts: GridItem[] = [
        {
            label: 'Os Elements',
            iconUrl: 'assets/icons/my-pc.png',
            onDblClick: () => this.onOsElementsShortcutDblClick()
        },
        {
            label: 'Os Elements (Win10)',
            iconUrl: 'assets/icons/my-pc.png',
            onDblClick: () => this.onOsElementsWin10ShortcutDblClick()
        },
        {
            label: 'Hello World',
            iconUrl: 'assets/icons/folder-opened.png',
            onDblClick: () => this.onHelloWorldShortcutDblClick()
        },
        {
            label: 'Fullscreen App',
            iconUrl: 'assets/icons/calculator.png',
            onDblClick: () => this.onFullscreenAppShortcutDblClick()
        }
    ];

    constructor(
        private readonly windowService: DynamicWindowService
    ) {}

    public ngOnInit(): void {
        this.onOsElementsWin10ShortcutDblClick();
    }

    public trackByFn = (shortcut: GridItem, index: number): number => {
        return index;
    }

    private onOsElementsShortcutDblClick(): void {
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

    private onOsElementsWin10ShortcutDblClick(): void {
        this.windowService.open(
            DemoWin10WindowComponent,
            {
                title: 'Angular OS - components overview (Win10)',
                minWidth: 700,
                height: 500
            }
        );
    }

    private onHelloWorldShortcutDblClick(): void {
        this.windowService.open(
            HelloWorldWindowComponent,
            {
                data: 'There is custom data for window!',
                positionX: 70,
                positionY: 350
            }
        );
    }

    private onFullscreenAppShortcutDblClick(): void {
        this.windowService.open(
            FullscreenTestAppComponent,
            {
                title: 'Fullscreen test App',
                width: 800,
                height: 600,
                isFullscreen: true
            }
        );
    }
}
