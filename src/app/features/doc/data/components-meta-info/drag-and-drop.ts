import { DragAndDropModule, OsDraggableDirective } from '@lib-modules';
import { DraggerOverviewComponent } from '../../demo';
import { OsComponentEnum } from '../../enums';
import { ComponentMetaInfo } from '../../interfaces';

export const DRAG_AND_DROP_META_INFO: ComponentMetaInfo = {
    name: 'Drag and Drop',
    type: OsComponentEnum.DragAndDrop,
    shortInfo: 'Drag and Drop component short info',
    imageUrl: '/assets/icons/components/drag-and-drop.png',
    libModules: [
        DragAndDropModule
    ],
    libDirectives: [
        OsDraggableDirective
    ],
    libInterfaces: [
        'DraggerParams',
        'DragInfo'
    ],
    libEnums: [
        'MouseButtonEnum'
    ],
    demoComponents: [
        {
            title: 'Dragger Overview',
            component: DraggerOverviewComponent
        }
    ]
};
