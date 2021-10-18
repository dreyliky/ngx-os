import { ButtonEnum, NumberEnum } from '../enums';
import { NumberButton } from './number-button';

export class ButtonEight extends NumberButton {
    public static type = ButtonEnum.Eight;

    public label = NumberEnum.Eight;
}
