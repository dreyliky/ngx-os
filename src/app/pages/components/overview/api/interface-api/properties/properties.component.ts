import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DocInterface, DocInterfaceProperty } from '@Features/doc';

@Component({
    selector: 'interface-properties',
    templateUrl: './properties.component.html',
    styleUrls: [
        './properties.component.scss',
        '../../base/api-base.component.scss'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PropertiesComponent {
    @Input()
    public set interface(docInterface: DocInterface) {
        this.properties = docInterface.properties;
    }

    public properties: DocInterfaceProperty[];
}
