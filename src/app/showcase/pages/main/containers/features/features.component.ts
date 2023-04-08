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
            title: '25+ MODULES',
            description: 'Functional and easy to use components help you to build '
                        + 'an amazing app in operating system style.'
        },
        {
            iconUrl: '/assets/showcase/icons/lightweight.png',
            title: 'LIGHTWEIGHT',
            description: 'There are no external dependencies, '
                        + 'also you can use the code of only modules you need.'
        },
        {
            iconUrl: '/assets/showcase/icons/full-documented.png',
            title: 'FULLY DOCUMENTED',
            description: 'Every module has its own documentation about usage. '
                        + 'Each field, method are documented too.'
        },
        {
            iconUrl: '/assets/showcase/icons/themes.png',
            title: '3 THEMES',
            description: 'Try to use: Win98, WinXP, Win10 themes. '
                        + 'You can switch between in realtime.'
        },
        {
            iconUrl: '/assets/showcase/icons/easy-to-use.png',
            title: 'EASY TO USE',
            description: 'Library has an intuitive and simple API. '
                        + 'Each module has examples to demonstrate key features.'
        },
        {
            iconUrl: '/assets/showcase/icons/open-source.png',
            title: 'OPEN SOURCE',
            description: 'All components are open source and free to use under MIT license. '
                        + 'Feel the power of open source.'
        }
    ];
}
