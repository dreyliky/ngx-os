import { ButtonEnum, NumberEnum } from '../enums';
import { NumberButton } from './number-button';

export class ButtonSix extends NumberButton {
    public static type = ButtonEnum.Six;

    public label = NumberEnum.Six;
}
