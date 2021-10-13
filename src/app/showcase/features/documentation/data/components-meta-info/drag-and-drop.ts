import {
    DragAndDropModule,
    DraggableDirective,
    DragStrategyByAxisProperties,
    DragStrategyByTranslate3d
} from 'ngx-os';
import { OsComponentEnum } from '../../enums';
import {
    DraggerOnAbsoluteElementComponent,
    DraggerOverviewComponent,
    DraggerViaHandleComponent,
    DraggerWithLockedAxisComponent
} from '../../examples';
import { ComponentMetaInfo } from '../../interfaces';

export const DRAG_AND_DROP_META_INFO: ComponentMetaInfo = {
    name: 'Drag and Drop',
    type: OsComponentEnum.DragAndDrop,
    shortInfo: 'Provides different features for dragging functionality.',
    imageUrl: '/assets/showcase/icons/components/drag-and-drop.png',
    libModules: [
        DragAndDropModule
    ],
    libDirectives: [
        DraggableDirective
    ],
    libClasses: [
        DragStrategyByTranslate3d,
        DragStrategyByAxisProperties
    ],
    libInterfaces: [
        'DraggerConfig',
        'DragInfo'
    ],
    libEnums: [
        'MouseButtonEnum'
    ],
    libTypes: [
        'DragStrategyType'
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
            title: 'Dragger via handle',
            component: DraggerViaHandleComponent
        },
        {
            title: 'Dragger on absolute element which append to body',
            component: DraggerOnAbsoluteElementComponent
        }
    ]
};
