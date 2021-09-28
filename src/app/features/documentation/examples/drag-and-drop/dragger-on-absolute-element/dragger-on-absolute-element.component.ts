import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DragStrategyByAxisProperties, IDraggerParams } from '@lib-modules';

@Component({
    selector: 'demo-dragger-on-absolute-element',
    templateUrl: './dragger-on-absolute-element.component.html',
    styleUrls: ['./dragger-on-absolute-element.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DraggerOnAbsoluteElementComponent {
    public readonly draggerConfig: IDraggerParams = {
        strategy: new DragStrategyByAxisProperties()
    };

    public isContainerVisible = false;

    public get buttonLabel(): string {
        const action = (this.isContainerVisible) ? 'Hide' : 'Show';

        return `${action} container`;
    }

    public onButtonClick(): void {
        this.isContainerVisible = !this.isContainerVisible;
    }
}
