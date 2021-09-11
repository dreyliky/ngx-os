import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'demo-author',
    templateUrl: './author.component.html',
    styleUrls: ['./author.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorComponent {}
