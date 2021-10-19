import { ChangeDetectionStrategy, Component, Injector } from '@angular/core';
import {
    BaseButton,
    ButtonClear,
    ButtonDelete,
    ButtonEqual,
    ButtonMathOperation,
    ButtonNumber
} from '../../classes';
import { NumberEnum, OperationEnum } from '../../enums';

@Component({
    selector: 'calculator-buttons-panel',
    templateUrl: './buttons-panel.component.html',
    styleUrls: [
        './buttons-panel.component.scss',
        './buttons-panel-win10.component.scss',
        './buttons-panel-winXP.component.scss'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonsPanelComponent {
    public buttons: BaseButton[] = [
        new ButtonClear(this.injector),
        new ButtonDelete(this.injector),
        new ButtonMathOperation(this.injector, OperationEnum.Division),
        new ButtonNumber(this.injector, NumberEnum.Seven),
        new ButtonNumber(this.injector, NumberEnum.Eight),
        new ButtonNumber(this.injector, NumberEnum.Nine),
        new ButtonMathOperation(this.injector, OperationEnum.Multiply),
        new ButtonNumber(this.injector, NumberEnum.Four),
        new ButtonNumber(this.injector, NumberEnum.Five),
        new ButtonNumber(this.injector, NumberEnum.Six),
        new ButtonMathOperation(this.injector, OperationEnum.Minus),
        new ButtonNumber(this.injector, NumberEnum.One),
        new ButtonNumber(this.injector, NumberEnum.Two),
        new ButtonNumber(this.injector, NumberEnum.Three),
        new ButtonMathOperation(this.injector, OperationEnum.Plus),
        new ButtonNumber(this.injector, NumberEnum.Zero),
        new ButtonEqual(this.injector)
    ];

    constructor(
        private readonly injector: Injector
    ) {}
}
