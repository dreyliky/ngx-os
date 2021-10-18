import { ButtonEnum, NumberEnum } from '../enums';
import { NumberButton } from './number-button';

export class ButtonFour extends NumberButton {
    public static type = ButtonEnum.Four;

    public label = NumberEnum.Four;
}
