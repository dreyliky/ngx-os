import { ButtonEnum, ButtonGroupEnum, OperationEnum } from '../enums';
import { MathOperationButton } from './math-operation.button';

export class ButtonPlus extends MathOperationButton {
    public static type = ButtonEnum.Plus;
    public static group = ButtonGroupEnum.Operation;

    public label = OperationEnum.Plus;
}
