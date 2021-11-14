import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { GuideDocumentationEnum, MARKDOWN_GUIDE_DOCUMENTATIONS } from '@features/documentation';

@Component({
    selector: 'get-started-side-bar',
    templateUrl: './side-bar.component.html',
    styleUrls: ['./side-bar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideBarComponent {
    @Input()
    public selectedGuideId: GuideDocumentationEnum;

    @Output()
    public readonly guideSelected = new EventEmitter<GuideDocumentationEnum>();

    public readonly guides = MARKDOWN_GUIDE_DOCUMENTATIONS;

    public isGuideSelected(id: GuideDocumentationEnum): boolean {
        return (this.selectedGuideId === id);
    }
}
