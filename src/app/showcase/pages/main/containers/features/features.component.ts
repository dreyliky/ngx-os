import { ChangeDetectionStrategy, Component } from '@angular/core';

interface Card {
    iconUrl: string;
    title: string;
    description: string;
}

@Component({
    selector: 'showcase-features',
    templateUrl: './features.component.html',
    styleUrls: ['./features.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeaturesComponent {
    public readonly cards: Card[] = [
        {
            iconUrl: '/assets/showcase/icons/components.png',
            title: '20+ COMPONENTS',
            description: 'Functional and easy to use components help you to build '
                        + 'an amazing app in operating system style.'
        },
        {
            iconUrl: '/assets/showcase/icons/themes.png',
            title: '3 THEMES',
            description: 'Try to use: Win98, WinXP, Win10 themes. '
                        + 'You can switch between in realtime.'
        },
        {
            iconUrl: '/assets/showcase/icons/open-source.png',
            title: 'OPEN SOURCE',
            description: 'All components are open source and free to use under MIT license. '
                        + 'Feel the power of open source.'
        }
    ];
}
