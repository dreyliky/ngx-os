import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { OsBaseButtonComponent } from '@lib-core';

@Component({
    selector: 'os-button',
    templateUrl: './button.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent extends OsBaseButtonComponent implements OnInit {
    public ngOnInit(): void {
        this.classlistManager.add('os-button');
    }
}
