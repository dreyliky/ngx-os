import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ComponentMetaInfo, DocComponent, DocDirective, DocInjectable, LibDocService } from '@Doc/features/doc';

@Component({
    selector: 'demo-api',
    templateUrl: './api.component.html',
    styleUrls: ['./api.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApiComponent implements OnChanges {
    @Input()
    public readonly metaInfo: ComponentMetaInfo;

    public get isSomeApiExist(): boolean {
        return !!(
            this.components.length ||
            this.services.length ||
            this.directives.length
        );
    }

    public components: DocComponent[] = [];
    public services: DocInjectable[] = [];
    public directives: DocDirective[] = [];

    constructor(
        private readonly docService: LibDocService
    ) {}

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.metaInfo.currentValue !== changes.metaInfo.previousValue) {
            this.initDocComponents();
            this.initDocServices();
            this.initDocDirectives();
        }
    }

    private initDocComponents(): void {
        if (this.metaInfo.libComponents) {
            this.components = this.docService.findDocComponentsByTypes(this.metaInfo.libComponents);
        } else {
            this.components = [];
        }
    }

    private initDocServices(): void {
        if (this.metaInfo.libServices) {
            this.services = this.docService.findDocInjectablesByTypes(this.metaInfo.libServices);
        } else {
            this.services = [];
        }
    }

    private initDocDirectives(): void {
        if (this.metaInfo.libDirectives) {
            this.directives = this.docService.findDocDirectivesByTypes(this.metaInfo.libDirectives);
        } else {
            this.directives = [];
        }
    }
}
