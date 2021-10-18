import { ButtonEnum, NumberEnum } from '../enums';
import { NumberButton } from './number-button';

export class ButtonFive extends NumberButton {
    public static type = ButtonEnum.Five;

    public label = NumberEnum.Five;
}
