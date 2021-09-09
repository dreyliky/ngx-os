import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MethodsClass } from '@Features/documentation';

@Component({
    selector: 'shared-methods',
    templateUrl: './methods.component.html',
    styleUrls: [
        './methods.component.scss',
        '../../base/api-base.component.scss'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MethodsComponent {
    @Input()
    public set classMethods(methods: MethodsClass[]) {
        if (methods) {
            this.processMethods(methods);
        }
    }

    public methods: MethodsClass[];

    private readonly publicModifierId: number = 122;

    private readonly forbiddenMethodStartsWithPhrase: string[] = [
        'ng',
        'on',
        'registerOn',
        'writeValue'
    ];

    private processMethods(methods: MethodsClass[]): void {
        this.methods = methods
            .filter((method) => {
                return (
                    this.isMethodModifierValid(method) &&
                    this.forbiddenMethodStartsWithPhrase
                        .every((phrase) => !method.name.startsWith(phrase))
                );
            });
    }

    private isMethodModifierValid(method: MethodsClass): boolean {
        if (method.modifierKind) {
            return method.modifierKind.includes(this.publicModifierId);
        }

        return true;
    }
}
