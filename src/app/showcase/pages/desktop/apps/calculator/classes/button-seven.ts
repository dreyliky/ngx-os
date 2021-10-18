import { ButtonEnum, NumberEnum } from '../enums';
import { NumberButton } from './number-button';

export class ButtonSeven extends NumberButton {
    public static type = ButtonEnum.Seven;

    public label = NumberEnum.Seven;
}
