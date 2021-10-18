import { ButtonEnum, ButtonGroupEnum, OperationEnum } from '../enums';
import { MathOperationButton } from './math-operation.button';

export class ButtonMultiply extends MathOperationButton {
    public static type = ButtonEnum.Multiply;
    public static group = ButtonGroupEnum.Operation;

    public label = OperationEnum.Multiply;
}
