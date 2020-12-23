import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component, Input, OnInit, Type
} from '@angular/core';
import { DemoComponentMetaInfo, DocComponent, DocService } from '@Doc/features/doc';

enum SectionEnum {
    Demo,
    HTML,
    SCSS,
    TS
}

@Component({
    selector: 'demo-demo-block',
    templateUrl: './demo-block.component.html',
    styleUrls: ['./demo-block.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoBlockComponent implements OnInit {

    @Input()
    public set demoComponentMetaInfo(data: DemoComponentMetaInfo) {
        this._demoComponentMetaInfo = data;
        this.initDemoDocComponent(data.component);
    }

    public get demoComponentMetaInfo(): DemoComponentMetaInfo {
        return this._demoComponentMetaInfo;
    }

    public readonly sectionEnum = SectionEnum;

    public openedSection = SectionEnum.Demo;
    public docComponent: DocComponent;

    private _demoComponentMetaInfo: DemoComponentMetaInfo;

    constructor(
        private readonly changeDetector: ChangeDetectorRef,
        private readonly docService: DocService
    ) {}

    public ngOnInit(): void {}

    private initDemoDocComponent(componentType: Type<any>): void {
        this.docComponent = this.docService.getDemoDocComponentByName(componentType);
        this.changeDetector.detectChanges();
    }

}