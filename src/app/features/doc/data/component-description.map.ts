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
            componentNames: ['ButtonComponent'],
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
            componentNames: ['CheckboxComponent']
        }
    )
    .set(
        'drag-and-drop',
        {
            name: 'Drag and Drop',
            type: 'drag-and-drop',
            shortInfo: 'Drag and Drop component short info',
            imageUrl: '',
            componentNames: []
        }
    )
    .set(
        'field-row',
        {
            name: 'Field row',
            type: 'field-row',
            shortInfo: 'Field row component short info',
            imageUrl: '',
            componentNames: ['FieldComponent']
        }
    )
    .set(
        'group-box',
        {
            name: 'Group box',
            type: 'group-box',
            shortInfo: 'Group box component short info',
            imageUrl: '',
            componentNames: ['GroupBoxComponent']
        }
    )
    .set(
        'list',
        {
            name: 'List',
            type: 'list',
            shortInfo: 'List component short info',
            imageUrl: '',
            componentNames: ['ListComponent']
        }
    )
    .set(
        'radio-button',
        {
            name: 'Radio button',
            type: 'radio-button',
            shortInfo: 'Radio button component short info',
            imageUrl: '',
            componentNames: ['RadioButtonComponent']
        }
    )
    .set(
        'resizer',
        {
            name: 'Resizer',
            type: 'resizer',
            shortInfo: 'Resizer',
            imageUrl: '',
            componentNames: ['ResizerComponent']
        }
    )
    .set(
        'scroll-view',
        {
            name: 'Scroll View',
            type: 'scroll-view',
            shortInfo: 'Scroll view component short info',
            imageUrl: '',
            componentNames: ['ScrollViewComponent']
        }
    )
    .set(
        'selectbox',
        {
            name: 'Selectbox',
            type: 'selectbox',
            shortInfo: 'Selectbox component short info',
            imageUrl: '',
            componentNames: ['SelectboxComponent']
        }
    )
    .set(
        'slider',
        {
            name: 'Slider',
            type: 'slider',
            shortInfo: 'Slider component short info',
            imageUrl: '',
            componentNames: ['SliderComponent']
        }
    )
    .set(
        'tab-group',
        {
            name: 'Tab Group',
            type: 'tab-group',
            shortInfo: 'Tab Group component short info',
            imageUrl: '',
            componentNames: ['TabGroupComponent']
        }
    )
    .set(
        'text',
        {
            name: 'Text',
            type: 'text',
            shortInfo: 'Text component short info',
            imageUrl: '',
            componentNames: ['TextComponent']
        }
    )
    .set(
        'text-box',
        {
            name: 'Text box',
            type: 'text-box',
            shortInfo: 'Text box component short info',
            imageUrl: '',
            componentNames: ['TextBoxComponent']
        }
    )
    .set(
        'textarea-box',
        {
            name: 'Textarea box',
            type: 'textarea-box',
            shortInfo: 'Textarea box component short info',
            imageUrl: '',
            componentNames: ['TextareaBoxComponent']
        }
    )
    .set(
        'tree-view',
        {
            name: 'Tree view',
            type: 'tree-view',
            shortInfo: 'Tree view component short info',
            imageUrl: '',
            componentNames: ['TreeViewComponent']
        }
    )
    .set(
        'window',
        {
            name: 'Window',
            type: 'window',
            shortInfo: 'Window component short info',
            imageUrl: '',
            componentNames: [
                'WindowComponent',
                'DynamicWindowComponent',
                'TitleBarComponent'
            ]
        }
    );
