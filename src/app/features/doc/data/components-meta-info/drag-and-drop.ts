import { DragAndDropModule, OsDraggableDirective } from '@lib-modules';
import { DraggerOverviewComponent } from '../../demo';
import { ComponentEnum } from '../../enums';
import { ComponentMetaInfo } from '../../interfaces';

export const DRAG_AND_DROP_META_INFO: ComponentMetaInfo = {
    name: 'Drag and Drop',
    type: ComponentEnum.DragAndDrop,
    shortInfo: 'Drag and Drop component short info',
    imageUrl: '/assets/icons/components/drag-and-drop.png',
    libModules: [
        DragAndDropModule
    ],
    libDirectives: [
        OsDraggableDirective
    ],
    demoComponents: [
        {
            title: 'Dragger Overview',
            component: DraggerOverviewComponent
        }
    ]
};
