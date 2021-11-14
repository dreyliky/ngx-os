import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DocMethod } from '@features/documentation';

@Component({
    selector: 'api-methods',
    templateUrl: './methods.component.html',
    styleUrls: [
        './methods.component.scss',
        '../../base/api-base.component.scss'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MethodsComponent {
    @Input()
    public set classMethods(methods: DocMethod[]) {
        if (methods) {
            this.processMethods(methods);
        }
    }

    public methods: DocMethod[];

    private readonly publicModifierIds = [122, 123];

    private readonly forbiddenMethodStartsWithPhrase: string[] = [
        '_',
        'ng',
        'on',
        'registerOn',
        'writeValue'
    ];

    private processMethods(methods: DocMethod[]): void {
        this.methods = methods
            .filter((method) => {
                return (
                    this.isMethodModifierValid(method) &&
                    this.forbiddenMethodStartsWithPhrase
                        .every((phrase) => !method.name.startsWith(phrase))
                );
            })
            .sort((a, b) => (a.line - b.line));
    }

    private isMethodModifierValid(method: DocMethod): boolean {
        if (method.modifierKind) {
            return this.publicModifierIds
                .some((modifierId) => method.modifierKind.includes(modifierId));
        }

        return true;
    }
}
