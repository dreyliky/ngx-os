import { Injector } from '@angular/core';
import { OPERATION_ARRAY } from '../data/operation.array';
import { ButtonGroupEnum, OperationEnum } from '../enums';
import { BaseButton } from './base-button';

export class ButtonMathOperation extends BaseButton {
    public readonly group = ButtonGroupEnum.Operation;

    constructor(
        injector: Injector,
        public readonly label: OperationEnum
    ) {
        super(injector);
    }

    public onClick(): void {
        const lastSymbol = this.output.getLastSymbol() as OperationEnum;

        if (OPERATION_ARRAY.includes(lastSymbol)) {
            this.output.replaceLastSymbol(this.label);
        } else {
            this.output.push(this.label);
        }
    }
}
