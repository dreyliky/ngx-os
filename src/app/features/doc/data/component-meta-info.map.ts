import {
    ButtonComponent,
    CheckboxComponent,
    DynamicWindowService,
    FieldRowComponent,
    GridComponent,
    GroupBoxComponent,
    HeaderComponent,
    ListComponent,
    ListItemComponent,
    OsDraggableDirective,
    OsResizableDirective,
    RadioButtonComponent,
    ScrollViewComponent,
    SelectboxComponent,
    SliderComponent,
    TabGroupComponent,
    TextareaBoxComponent,
    TextBoxComponent,
    TextComponent,
    ThemeService,
    TitleBarComponent,
    WindowComponent
} from 'os-angular';
import {
    ButtonCounterComponent,
    ButtonOverviewComponent,
    CheckboxOverviewComponent,
    FieldRowOverviewComponent,
    GridOverviewComponent,
    GroupBoxOverviewComponent,
    ListOverviewComponent,
    RadioButtonOverviewComponent,
    ScrollViewOverviewComponent,
    SelectboxOverviewComponent,
    SliderOverviewComponent,
    TabGroupOverviewComponent,
    TextareaOverviewComponent,
    TextBoxOverviewComponent,
    TextOverviewComponent,
    WindowDynamicOpeningComponent,
    WindowOverviewComponent,
    WindowTitleBarComponent
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
            imageUrl: '/assets/icons/components/button.png',
            libComponents: [
                ButtonComponent
            ],
            demoComponents: [
                {
                    title: 'Buttons with different states',
                    component: ButtonOverviewComponent
                },
                {
                    title: 'Counter',
                    component: ButtonCounterComponent
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
            imageUrl: '/assets/icons/components/checkbox.png',
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
            imageUrl: '/assets/icons/components/drag-and-drop.png',
            libDirectives: [
                OsDraggableDirective
            ]
        }
    )
    .set(
        'field-row',
        {
            name: 'Field row',
            type: 'field-row',
            shortInfo: 'Field row component short info',
            imageUrl: '/assets/icons/components/folder.png',
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
            imageUrl: '/assets/icons/components/folder.png',
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
        'grid',
        {
            name: 'Grid',
            type: 'grid',
            shortInfo: 'Grid component short info',
            imageUrl: '/assets/icons/components/grid.png',
            libComponents: [
                GridComponent
            ],
            demoComponents: [
                {
                    title: 'Grid Overview',
                    component: GridOverviewComponent
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
            imageUrl: '/assets/icons/components/list.png',
            libComponents: [
                ListComponent,
                ListItemComponent
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
            imageUrl: '/assets/icons/components/radio-button.png',
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
            imageUrl: '/assets/icons/components/resizer.png',
            libDirectives: [
                OsResizableDirective
            ]
        }
    )
    .set(
        'scroll-view',
        {
            name: 'Scroll View',
            type: 'scroll-view',
            shortInfo: 'Scroll view component short info',
            imageUrl: '/assets/icons/components/scroll-view.png',
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
            imageUrl: '/assets/icons/components/selectbox.png',
            libComponents: [
                SelectboxComponent
            ],
            demoComponents: [
                {
                    title: 'Selectbox Overview',
                    component: SelectboxOverviewComponent
                }
            ]
        }
    )
    .set(
        'slider',
        {
            name: 'Slider',
            type: 'slider',
            shortInfo: 'Slider component short info',
            imageUrl: '/assets/icons/components/slider.png',
            libComponents: [
                SliderComponent
            ],
            demoComponents: [
                {
                    title: 'Selectbox Overview',
                    component: SliderOverviewComponent
                }
            ]
        }
    )
    .set(
        'tab-group',
        {
            name: 'Tab Group',
            type: 'tab-group',
            shortInfo: 'Tab Group component short info',
            imageUrl: '/assets/icons/components/tab-group.png',
            libComponents: [
                TabGroupComponent
            ],
            demoComponents: [
                {
                    title: 'Tab Group Overview',
                    component: TabGroupOverviewComponent
                }
            ]
        }
    )
    .set(
        'text',
        {
            name: 'Text',
            type: 'text',
            shortInfo: 'Text component short info',
            imageUrl: '/assets/icons/components/text.png',
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
            imageUrl: '/assets/icons/components/text-box.png',
            libComponents: [
                TextBoxComponent
            ],
            demoComponents: [
                {
                    title: 'Text box Overview',
                    component: TextBoxOverviewComponent
                }
            ]
        }
    )
    .set(
        'textarea-box',
        {
            name: 'Textarea box',
            type: 'textarea-box',
            shortInfo: 'Textarea box component short info',
            imageUrl: '/assets/icons/components/text-box.png',
            libComponents: [
                TextareaBoxComponent
            ],
            demoComponents: [
                {
                    title: 'Textarea box Overview',
                    component: TextareaOverviewComponent
                }
            ]
        }
    )
    .set(
        'theme',
        {
            name: 'Theme',
            type: 'theme',
            shortInfo: 'Theme short info',
            imageUrl: '/assets/icons/components/folder.png',
            libServices: [
                ThemeService
            ]
        }
    )
    .set(
        'window',
        {
            name: 'Window',
            type: 'window',
            shortInfo: 'Window component short info',
            imageUrl: '/assets/icons/components/window.png',
            libComponents: [
                WindowComponent,
                TitleBarComponent
            ],
            libServices: [
                DynamicWindowService
            ],
            demoComponents: [
                {
                    title: 'Window Overview',
                    component: WindowOverviewComponent
                },
                {
                    title: 'Dynamic Window',
                    component: WindowDynamicOpeningComponent
                },
                {
                    title: 'Title Bar Overview',
                    component: WindowTitleBarComponent
                }
            ]
        }
    );
