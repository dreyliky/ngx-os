import { Component, OnInit, ChangeDetectionStrategy, ContentChildren, QueryList } from '@angular/core';
import { OsBaseComponent } from 'os-angular/core';
import { OptionComponent } from '../option';

@Component({
    selector: 'os-selectbox',
    templateUrl: './selectbox.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectboxComponent extends OsBaseComponent implements OnInit {

    @ContentChildren(OptionComponent)
    public readonly optionComponentList: QueryList<OptionComponent>;

    constructor () {
        super({
            elementName: 'os-selectbox'
        });
    }

    public ngOnInit (): void {
        super.ngOnInit();
    }

    public trackByFn (optionComponent: OptionComponent, index: number): number {
        return index;
    }

}
