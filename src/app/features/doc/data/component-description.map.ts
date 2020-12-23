import {
    ButtonComponent, CheckboxComponent, DynamicWindowComponent,
    FieldRowComponent, GroupBoxComponent, HeaderComponent, ListComponent,
    RadioButtonComponent, ScrollViewComponent, SelectboxComponent,
    SliderComponent, TabGroupComponent, TextareaBoxComponent, TextBoxComponent,
    TextComponent, TitleBarComponent, TreeViewComponent, WindowComponent
} from 'os-angular';
import {
    ButtonOverviewComponent, CheckboxOverviewComponent,
    FieldRowOverviewComponent,
    GroupBoxOverviewComponent,
    ListOverviewComponent,
    RadioButtonOverviewComponent,
    ScrollViewOverviewComponent,
    TextOverviewComponent, WindowOverviewComponent
} from '../demo';
import { ComponentMetaInfo } from '../interfaces';
import { ComponentType } from '../types';

export const ComponentMetaInfoMap = new Map<ComponentType, ComponentMetaInfo>()
    .set(
        'button',
        {
            name: 'Button',
            type: 'button',
            shortInfo: 'Button component short info',
            imageUrl: '',
            libComponents: [
                ButtonComponent
            ],
            demoComponents: [
                {
                    title: 'Button Overview',
                    component: ButtonOverviewComponent
                }
            ]
        }
    )
    .set(
        'checkbox',
        {
            name: 'Checkbox',
            type: 'checkbox',
            shortInfo: 'Checkbox component short info',
            imageUrl: '',
            libComponents: [
                CheckboxComponent
            ],
            demoComponents: [
                {
                    title: 'Checkbox Overview',
                    component: CheckboxOverviewComponent
                }
            ]
        }
    )
    .set(
        'drag-and-drop',
        {
            name: 'Drag and Drop',
            type: 'drag-and-drop',
            shortInfo: 'Drag and Drop component short info',
            imageUrl: '',
            libComponents: []
        }
    )
    .set(
        'field-row',
        {
            name: 'Field row',
            type: 'field-row',
            shortInfo: 'Field row component short info',
            imageUrl: '',
            libComponents: [
                FieldRowComponent
            ],
            demoComponents: [
                {
                    title: 'Field row Overview',
                    component: FieldRowOverviewComponent
                }
            ]
        }
    )
    .set(
        'group-box',
        {
            name: 'Group box',
            type: 'group-box',
            shortInfo: 'Group box component short info',
            imageUrl: '',
            libComponents: [
                GroupBoxComponent
            ],
            demoComponents: [
                {
                    title: 'Group box Overview',
                    component: GroupBoxOverviewComponent
                }
            ]
        }
    )
    .set(
        'list',
        {
            name: 'List',
            type: 'list',
            shortInfo: 'List component short info',
            imageUrl: '',
            libComponents: [
                ListComponent
            ],
            demoComponents: [
                {
                    title: 'List Overview',
                    component: ListOverviewComponent
                }
            ]
        }
    )
    .set(
        'radio-button',
        {
            name: 'Radio button',
            type: 'radio-button',
            shortInfo: 'Radio button component short info',
            imageUrl: '',
            libComponents: [
                RadioButtonComponent
            ],
            demoComponents: [
                {
                    title: 'Radio button Overview',
                    component: RadioButtonOverviewComponent
                }
            ]
        }
    )
    .set(
        'resizer',
        {
            name: 'Resizer',
            type: 'resizer',
            shortInfo: 'Resizer',
            imageUrl: '',
            libComponents: []
        }
    )
    .set(
        'scroll-view',
        {
            name: 'Scroll View',
            type: 'scroll-view',
            shortInfo: 'Scroll view component short info',
            imageUrl: '',
            libComponents: [
                ScrollViewComponent
            ],
            demoComponents: [
                {
                    title: 'Scroll View Overview',
                    component: ScrollViewOverviewComponent
                }
            ]
        }
    )
    .set(
        'selectbox',
        {
            name: 'Selectbox',
            type: 'selectbox',
            shortInfo: 'Selectbox component short info',
            imageUrl: '',
            libComponents: [
                SelectboxComponent
            ]
        }
    )
    .set(
        'slider',
        {
            name: 'Slider',
            type: 'slider',
            shortInfo: 'Slider component short info',
            imageUrl: '',
            libComponents: [
                SliderComponent
            ]
        }
    )
    .set(
        'tab-group',
        {
            name: 'Tab Group',
            type: 'tab-group',
            shortInfo: 'Tab Group component short info',
            imageUrl: '',
            libComponents: [
                TabGroupComponent
            ]
        }
    )
    .set(
        'text',
        {
            name: 'Text',
            type: 'text',
            shortInfo: 'Text component short info',
            imageUrl: '',
            libComponents: [
                TextComponent,
                HeaderComponent
            ],
            demoComponents: [
                {
                    title: 'Text Overview',
                    component: TextOverviewComponent
                }
            ]
        }
    )
    .set(
        'text-box',
        {
            name: 'Text box',
            type: 'text-box',
            shortInfo: 'Text box component short info',
            imageUrl: '',
            libComponents: [
                TextBoxComponent
            ]
        }
    )
    .set(
        'textarea-box',
        {
            name: 'Textarea box',
            type: 'textarea-box',
            shortInfo: 'Textarea box component short info',
            imageUrl: '',
            libComponents: [
                TextareaBoxComponent
            ]
        }
    )
    .set(
        'tree-view',
        {
            name: 'Tree view',
            type: 'tree-view',
            shortInfo: 'Tree view component short info',
            imageUrl: '',
            libComponents: [
                TreeViewComponent
            ]
        }
    )
    .set(
        'window',
        {
            name: 'Window',
            type: 'window',
            shortInfo: 'Window component short info',
            imageUrl: '',
            libComponents: [
                WindowComponent,
                DynamicWindowComponent,
                TitleBarComponent
            ],
            demoComponents: [
                {
                    title: 'Window Overview',
                    component: WindowOverviewComponent
                }
            ]
        }
    );
