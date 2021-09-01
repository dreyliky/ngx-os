import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DocInterface, DocInterfaceMethod } from '@Features/doc';

@Component({
    selector: 'interface-methods',
    templateUrl: './methods.component.html',
    styleUrls: [
        './methods.component.scss',
        '../../base/api-base.component.scss'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MethodsComponent {
    @Input()
    public set interface(docInterface: DocInterface) {
        this.methods = docInterface.methods;
    }

    public methods: DocInterfaceMethod[];
}
