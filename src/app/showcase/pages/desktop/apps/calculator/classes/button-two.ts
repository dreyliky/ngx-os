import { ButtonEnum, NumberEnum } from '../enums';
import { NumberButton } from './number-button';

export class ButtonTwo extends NumberButton {
    public static type = ButtonEnum.Two;

    public label = NumberEnum.Two;
}
