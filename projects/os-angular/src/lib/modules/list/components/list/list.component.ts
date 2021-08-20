import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { OsBaseComponent } from '@lib-core';

@Component({
    selector: 'os-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent extends OsBaseComponent implements OnInit {
    @Input()
    public scrollViewStyle: object;

    @Input()
    public scrollViewStyleClass: string;

    public ngOnInit(): void {
        this.hostClasslistManager.add('os-list');
    }
}
