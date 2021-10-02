import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DocClassProperty } from '@Features/documentation';

@Component({
    selector: 'api-properties',
    templateUrl: './properties.component.html',
    styleUrls: [
        './properties.component.scss',
        '../../base/api-base.component.scss'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PropertiesComponent {
    @Input()
    public set classProperties(properties: DocClassProperty[]) {
        if (properties) {
            this.processProperties(properties);
        }
    }

    public properties: DocClassProperty[];

    private readonly publicModifierId: number = 122;

    private processProperties(properties: DocClassProperty[]): void {
        const propertyNames = properties.map((input) => input.name);

        this.properties = properties
            .filter((property, index) => (
                (propertyNames.indexOf(property.name) === index) &&
                !property.name.startsWith('_') &&
                this.isPropertyModifierValid(property)
            ))
            .sort((a, b) => (!!a.inheritance) ? 1 : (a.line - b.line));
    }

    private isPropertyModifierValid(property: DocClassProperty): boolean {
        if (property.modifierKind) {
            return property.modifierKind.includes(this.publicModifierId);
        }

        return true;
    }
}
