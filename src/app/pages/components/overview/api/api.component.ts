import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ComponentMetaInfo, DocComponent, DocInjectable, DocService } from '@Doc/features/doc';

@Component({
    selector: 'demo-api',
    templateUrl: './api.component.html',
    styleUrls: ['./api.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApiComponent implements OnChanges {
    @Input()
    public readonly metaInfo: ComponentMetaInfo;

    public components: DocComponent[] = [];
    public services: DocInjectable[] = [];

    constructor(
        private readonly docService: DocService
    ) {}

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.metaInfo.currentValue !== changes.metaInfo.previousValue) {
            this.initDocComponents();
            this.initDocServices();
        }
    }

    private initDocComponents(): void {
        if (this.metaInfo.libComponents) {
            this.components = this.docService.getLibDocComponentsByTypes(this.metaInfo.libComponents);
        }
    }

    private initDocServices(): void {
        if (this.metaInfo.libServices) {
            this.services = this.docService.getLibDocInjectablesByTypes(this.metaInfo.libServices);
        }
    }
}
