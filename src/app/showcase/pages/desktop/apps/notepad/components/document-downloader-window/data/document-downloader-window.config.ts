import { DynamicWindowConfig } from 'ngx-os';

export const DOCUMENT_DOWNLOADER_WINDOW_CONFIG: DynamicWindowConfig = {
    title: 'Download document',
    width: 300,
    height: 250,
    isAllowHide: false,
    isAllowFullscreen: false,
    isAlwaysOnTop: true,
    allowedResizers: []
};
