import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'demo-theming',
    templateUrl: './theming.component.html',
    styleUrls: ['./theming.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemingComponent implements OnInit {

    constructor() {}

    public ngOnInit(): void {}

}
