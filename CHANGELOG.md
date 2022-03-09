# Changelog

## [v. 1.0.9-alpha]

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
