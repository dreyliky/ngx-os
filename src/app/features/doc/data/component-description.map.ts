import {
    ButtonComponent, CheckboxComponent, DynamicWindowComponent, FieldRowComponent, GroupBoxComponent, HeaderComponent, ListComponent, RadioButtonComponent, ScrollViewComponent, SelectboxComponent, SliderComponent, TabGroupComponent, TextareaBoxComponent, TextBoxComponent, TextComponent, TitleBarComponent, TreeViewComponent, WindowComponent
} from 'os-angular';
import { ButtonOverviewComponent } from '../demo';
import { ComponentDescription } from '../interfaces/component-description.interface';
import { ComponentType } from '../types';

export const ComponentDescriptionMap = new Map<ComponentType, ComponentDescription>()
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
                ButtonOverviewComponent
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
            ]
        }
    );
