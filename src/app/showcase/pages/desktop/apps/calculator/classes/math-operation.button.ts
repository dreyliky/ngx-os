import { OPERATION_ARRAY } from '../data/operation.array';
import { ButtonGroupEnum, OperationEnum } from '../enums';
import { BaseButton } from './base-button';

export abstract class MathOperationButton extends BaseButton {
    public static group = ButtonGroupEnum.Operation;

    public onClick(): void {
        const lastSymbol = this.output.getLastSymbol() as OperationEnum;

        if (OPERATION_ARRAY.includes(lastSymbol)) {
            this.output.replaceLastSymbol(this.label);
        } else {
            this.output.push(this.label);
        }
    }
}
