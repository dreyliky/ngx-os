import { OsComponentEnum } from '../enums';
import { ComponentMetaInfo } from '../interfaces';
import {
    BUTTON_META_INFO,
    CHECKBOX_META_INFO,
    CONTEXT_MENU_META_INFO,
    DIVIDER_META_INFO,
    DRAG_AND_DROP_META_INFO,
    DROPDOWN_META_INFO,
    EMAIL_BOX_META_INFO,
    FORM_FIELD_META_INFO,
    GRID_META_INFO,
    GROUP_BOX_META_INFO,
    HINT_META_INFO,
    LIST_META_INFO,
    MENU_BAR_META_INFO,
    NUMBER_BOX_META_INFO,
    PASSWORD_BOX_META_INFO,
    RADIO_BUTTON_META_INFO,
    RESIZER_META_INFO,
    SCROLL_VIEW_META_INFO,
    SELECTION_META_INFO,
    SLIDER_META_INFO,
    TAB_GROUP_META_INFO,
    TEXTAREA_BOX_META_INFO,
    TEXT_BOX_META_INFO,
    TEXT_META_INFO,
    THEME_META_INFO,
    TREE_VIEW_META_INFO,
    UTILS_META_INFO,
    WINDOW_META_INFO
} from './components-meta-info';

export const ComponentMetaInfoMap = new Map<OsComponentEnum, ComponentMetaInfo>()
    .set(
        OsComponentEnum.Button,
        BUTTON_META_INFO
    )
    .set(
        OsComponentEnum.Checkbox,
        CHECKBOX_META_INFO
    )
    .set(
        OsComponentEnum.Divider,
        DIVIDER_META_INFO
    )
    .set(
        OsComponentEnum.ContextMenu,
        CONTEXT_MENU_META_INFO
    )
    .set(
        OsComponentEnum.DragAndDrop,
        DRAG_AND_DROP_META_INFO
    )
    .set(
        OsComponentEnum.FormField,
        FORM_FIELD_META_INFO
    )
    .set(
        OsComponentEnum.GroupBox,
        GROUP_BOX_META_INFO
    )
    .set(
        OsComponentEnum.Hint,
        HINT_META_INFO
    )
    .set(
        OsComponentEnum.Grid,
        GRID_META_INFO
    )
    .set(
        OsComponentEnum.List,
        LIST_META_INFO
    )
    .set(
        OsComponentEnum.MenuBar,
        MENU_BAR_META_INFO
    )
    .set(
        OsComponentEnum.RadioButton,
        RADIO_BUTTON_META_INFO
    )
    .set(
        OsComponentEnum.Resizer,
        RESIZER_META_INFO
    )
    .set(
        OsComponentEnum.ScrollView,
        SCROLL_VIEW_META_INFO
    )
    .set(
        OsComponentEnum.Selection,
        SELECTION_META_INFO
    )
    .set(
        OsComponentEnum.Dropdown,
        DROPDOWN_META_INFO
    )
    .set(
        OsComponentEnum.Slider,
        SLIDER_META_INFO
    )
    .set(
        OsComponentEnum.TabGroup,
        TAB_GROUP_META_INFO
    )
    .set(
        OsComponentEnum.Text,
        TEXT_META_INFO
    )
    .set(
        OsComponentEnum.TextBox,
        TEXT_BOX_META_INFO
    )
    .set(
        OsComponentEnum.NumberBox,
        NUMBER_BOX_META_INFO
    )
    .set(
        OsComponentEnum.EmailBox,
        EMAIL_BOX_META_INFO
    )
    .set(
        OsComponentEnum.PasswordBox,
        PASSWORD_BOX_META_INFO
    )
    .set(
        OsComponentEnum.TextareaBox,
        TEXTAREA_BOX_META_INFO
    )
    .set(
        OsComponentEnum.Theme,
        THEME_META_INFO
    )
    .set(
        OsComponentEnum.TreeView,
        TREE_VIEW_META_INFO
    )
    .set(
        OsComponentEnum.Window,
        WINDOW_META_INFO
    )
    .set(
        OsComponentEnum.Utils,
        UTILS_META_INFO
    );
