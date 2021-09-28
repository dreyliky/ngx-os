import { DragAndDropModule, DraggableDirective } from '@lib-modules';
import { OsComponentEnum } from '../../enums';
import {
    DraggerOnAbsoluteElementComponent, DraggerOverviewComponent,
    DraggerWithLockedAxisComponent
} from '../../examples';
import { ComponentMetaInfo } from '../../interfaces';

export const DRAG_AND_DROP_META_INFO: ComponentMetaInfo = {
    name: 'Drag and Drop',
    type: OsComponentEnum.DragAndDrop,
    shortInfo: 'Provides different features for dragging functionality.',
    imageUrl: '/assets/icons/components/drag-and-drop.png',
    libModules: [
        DragAndDropModule
    ],
    libDirectives: [
        DraggableDirective
    ],
    libInterfaces: [
        'IDraggerParams',
        'IDragInfo'
    ],
    libEnums: [
        'MouseButtonEnum'
    ],
    demoComponents: [
        {
            title: 'Dragger Overview',
            component: DraggerOverviewComponent
        },
        {
            title: 'Dragger with locked axis',
            component: DraggerWithLockedAxisComponent
        },
        {
            title: 'Dragger on absolute element which append to body',
            component: DraggerOnAbsoluteElementComponent
        }
    ]
};
