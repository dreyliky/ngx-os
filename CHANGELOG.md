# Changelog

## [v. 2.0.0-alpha]

### Features

- Angular 15;
- Context Menu Module;
- Divider Module;
- Hint Module;
- Menu Bar Module;
- Selection Module;

### Changes

- Changed API for a lot of features to make it closer to native elements/approaches;
- Different modules for input merged to single InputModule;

## [v. 1.1.0-alpha]

### Bug Fixes

- Fixed NumberBox issue with incorrect behavior of `isAllowEmpty` option;

## [v. 1.0.9-alpha]

### Bug Fixes

- Fixed NumberBox incorrect output type;
- Changed keyframe names at the Window SCSS files;

## [v. 1.0.8-alpha]

### Bug Fixes

- All components with ValueAccessor support now trigger onTouched callback;
- All components with ValueAccessor support now change value reactively (not at blur event);
- Fixed probably memory leaks;

## [v. 1.0.7-alpha]

### Features

- Add prefix `ɵ` for remaining internal library's features;

### Bug Fixes

- Optimization of ChangeDetection calls from `os` components for projects with `ChangeDetection.Default`;
- Reduce the number of event listeners for each `os` component;

## [v. 1.0.6-alpha]

### Features

- Add prefix `ɵ` for most of the internal library's features.
The idea is to prevent imports of those internal things and to reduce the chance of showing internal things from the IDE intellisense.
- Optimize `click outside detection` for: DynamicWindow, GridItem, DropDown;

## [v. 1.0.2-alpha]

Release
