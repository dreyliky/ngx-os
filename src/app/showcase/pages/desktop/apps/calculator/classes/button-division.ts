import { ButtonEnum, ButtonGroupEnum, OperationEnum } from '../enums';
import { MathOperationButton } from './math-operation.button';

export class ButtonDivision extends MathOperationButton {
    public static type = ButtonEnum.Division;
    public static group = ButtonGroupEnum.Operation;

    public label = OperationEnum.Division;
}
