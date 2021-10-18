import { ButtonEnum, NumberEnum } from '../enums';
import { NumberButton } from './number-button';

export class ButtonZero extends NumberButton {
    public static type = ButtonEnum.Zero;

    public label = NumberEnum.Zero;
}
