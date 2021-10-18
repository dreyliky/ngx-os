import { ButtonEnum, ButtonGroupEnum, OperationEnum } from '../enums';
import { MathOperationButton } from './math-operation.button';

export class ButtonMinus extends MathOperationButton {
    public static type = ButtonEnum.Minus;
    public static group = ButtonGroupEnum.Operation;

    public label = OperationEnum.Minus;
}
