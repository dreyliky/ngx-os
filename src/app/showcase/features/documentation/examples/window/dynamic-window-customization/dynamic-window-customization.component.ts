import { ChangeDetectionStrategy, Component, Inject, ViewEncapsulation } from '@angular/core';
import { DynamicWindowRef, DynamicWindowService } from 'ngx-os/modules';

@Component({
    selector: 'demo-dynamic-window-customization',
    templateUrl: './dynamic-window-customization.component.html',
    styleUrls: ['./dynamic-window-customization.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class DynamicWindowCustomizationComponent {
    constructor(
        private readonly dynamicWindowService: DynamicWindowService
    ) {}

    public onOpenButtonClick(): void {
        this.dynamicWindowService.open(MyAppComponent, {
            minWidth: 350,
            titleBarCustomContent: MyAppTitleBarComponent,
            styleClass: 'window-telegram-style'
        });
    }
}

@Component({
    selector: 'my-app',
    template: `<div class="select-chat-info">Select a chat to start messaging</div>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyAppComponent {}

@Component({
    selector: 'my-app-title-bar-content',
    template: `
        <os-title-bar-button
            class="close"
            (osClick)="onCloseButtonClick()">
        </os-title-bar-button>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyAppTitleBarComponent {
    constructor(
        @Inject(DynamicWindowRef) private readonly windowRef: DynamicWindowRef
    ) {}

    public onCloseButtonClick(): void {
        this.windowRef.close();
    }
}
