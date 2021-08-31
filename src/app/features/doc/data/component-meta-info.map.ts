/* eslint-disable max-lines */
import {
    ButtonComponent,
    ButtonModule,
    CheckboxComponent,
    CheckboxModule,
    DragAndDropModule,
    DynamicWindowService,
    FieldRowComponent,
    FieldRowModule,
    GridComponent,
    GridModule,
    GroupBoxComponent,
    GroupBoxModule,
    HeaderComponent,
    ListComponent,
    ListItemComponent,
    ListModule,
    OsDraggableDirective,
    OsResizableDirective,
    RadioButtonComponent,
    RadioButtonModule,
    ResizerModule,
    ScrollViewComponent,
    ScrollViewModule,
    SelectboxComponent,
    SelectboxModule,
    SliderComponent,
    SliderModule,
    TabGroupComponent,
    TabGroupModule,
    TextareaBoxComponent,
    TextareaBoxModule,
    TextBoxComponent,
    TextBoxModule,
    TextComponent,
    TextModule,
    ThemeService,
    TitleBarComponent,
    WindowComponent,
    WindowModule
} from 'os-angular';
import {
    ButtonCounterComponent,
    ButtonOverviewComponent,
    CheckboxOverviewComponent,
    DraggerOverviewComponent,
    FieldRowOverviewComponent,
    GridOverviewComponent,
    GroupBoxOverviewComponent,
    ListOverviewComponent,
    RadioButtonOverviewComponent,
    ResizerOverviewComponent,
    ScrollViewOverviewComponent,
    SelectboxOverviewComponent,
    SliderOverviewComponent,
    TabGroupOverviewComponent,
    TextareaOverviewComponent,
    TextBoxOverviewComponent,
    TextOverviewComponent,
    ThemeOverviewComponent,
    WindowDynamicOpeningComponent,
    WindowOverviewComponent,
    WindowTitleBarComponent
} from '../demo';
import { ComponentMetaInfo } from '../interfaces';
import { ComponentType } from '../types';

// FIXME: Refactor (move each MetaInfo into independent file)
export const ComponentMetaInfoMap = new Map<ComponentType, ComponentMetaInfo>()
    .set(
        'button',
        {
            name: 'Button',
            type: 'button',
            shortInfo: 'Button component short info',
            imageUrl: '/assets/icons/components/button.png',
            libModules: [
                ButtonModule
            ],
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
            libModules: [
                CheckboxModule
            ],
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
        }
    )
    .set(
        'field-row',
        {
            name: 'Field row',
            type: 'field-row',
            shortInfo: 'Field row component short info',
            imageUrl: '/assets/icons/components/folder.png',
            libModules: [
                FieldRowModule
            ],
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
            libModules: [
                GroupBoxModule
            ],
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
            libModules: [
                GridModule
            ],
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
            libModules: [
                ListModule
            ],
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
            libModules: [
                RadioButtonModule
            ],
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
            libModules: [
                ResizerModule
            ],
            libDirectives: [
                OsResizableDirective
            ],
            demoComponents: [
                {
                    title: 'Resizer Overview',
                    component: ResizerOverviewComponent
                }
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
            libModules: [
                ScrollViewModule
            ],
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
            libModules: [
                SelectboxModule
            ],
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
            libModules: [
                SliderModule
            ],
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
            libModules: [
                TabGroupModule
            ],
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
            libModules: [
                TextModule
            ],
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
            libModules: [
                TextBoxModule
            ],
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
            libModules: [
                TextareaBoxModule
            ],
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
            ],
            demoComponents: [
                {
                    title: 'Theme Overview',
                    component: ThemeOverviewComponent
                }
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
            libModules: [
                WindowModule
            ],
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
