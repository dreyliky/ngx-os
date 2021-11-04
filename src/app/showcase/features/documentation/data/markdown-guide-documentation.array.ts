import { GuideDocumentationEnum as GuideDoc } from '../enums';
import { MarkdownDocumentation } from '../interfaces';

export const MARKDOWN_GUIDE_DOCUMENTATIONS: MarkdownDocumentation<GuideDoc>[] = [
    {
        id: GuideDoc.GetStarted,
        name: 'Get Started'
    },
    {
        id: GuideDoc.AvailableThemes,
        name: 'Available Themes'
    },
    {
        id: GuideDoc.ImportSpecificModulesStyles,
        name: 'How to import specific modules styles files from themes?'
    },
    {
        id: GuideDoc.LocalCssVariables,
        name: 'About Local CSS Variables in Themes'
    }
];
