import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseButton, ButtonFactory } from '../../classes';
import { ButtonEnum } from '../../enums';

@Component({
    selector: 'calculator-buttons-panel',
    templateUrl: './buttons-panel.component.html',
    styleUrls: [
        './buttons-panel.component.scss',
        './buttons-panel-win10.component.scss'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        ButtonFactory
    ]
})
export class ButtonsPanelComponent {
    public buttons: BaseButton[] = [
        this.buttonFactory.create(ButtonEnum.Clear),
        this.buttonFactory.create(ButtonEnum.Delete),
        this.buttonFactory.create(ButtonEnum.Division),
        this.buttonFactory.create(ButtonEnum.Seven),
        this.buttonFactory.create(ButtonEnum.Eight),
        this.buttonFactory.create(ButtonEnum.Nine),
        this.buttonFactory.create(ButtonEnum.Multiply),
        this.buttonFactory.create(ButtonEnum.Four),
        this.buttonFactory.create(ButtonEnum.Five),
        this.buttonFactory.create(ButtonEnum.Six),
        this.buttonFactory.create(ButtonEnum.Minus),
        this.buttonFactory.create(ButtonEnum.One),
        this.buttonFactory.create(ButtonEnum.Two),
        this.buttonFactory.create(ButtonEnum.Three),
        this.buttonFactory.create(ButtonEnum.Plus),
        this.buttonFactory.create(ButtonEnum.Zero),
        this.buttonFactory.create(ButtonEnum.Equal)
    ];

    constructor(
        private readonly buttonFactory: ButtonFactory
    ) {}
}
