import { ChangeDetectionStrategy, Component } from '@angular/core';

interface SupportWebsite {
    name: string;
    iconUrl: string;
    url: string;
}

@Component({
    selector: 'showcase-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
    public readonly websites: SupportWebsite[] = [
        {
            name: 'Patreon',
            iconUrl: '/assets/showcase/icons/patreon.png',
            url: 'https://www.patreon.com/dreyliky'
        },
        {
            name: 'Buy me a Coffee',
            iconUrl: '/assets/showcase/icons/buy-me-a-coffee.png',
            url: 'https://www.buymeacoffee.com/dreyliky'
        }
    ];

    public onWebsiteDblClick(website: SupportWebsite): void {
        window.open(website.url, '_blank');
    }
}
