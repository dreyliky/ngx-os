import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'doc-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent implements OnInit {

    constructor(
        private readonly http: HttpClient
    ) {}

    public ngOnInit(): void {
        this.http.get('./button.component.html')
            .subscribe(
                (d) => console.log(d),
                (e) => console.log(e)
            );
    }

}
