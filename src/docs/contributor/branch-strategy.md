# Branch Strategy of the ngx-os

**I am not an expert in this matter, but I see the process as follows:**

## main branch

Contains the latest version of the production codebase.

## version branch

Contains codebase of a specific version of the production & development stages. Might have unstable code.

Stages:
- dev;
- prod;

Naming:
- alpha: `0.0.x-stage`;
- beta: `0.x.x-stage`;
- release: `x.x.x-stage`;

Merge strategy:
- Stable changes of the `version-dev` branch are merged into the `version-prod` branch;
- Changes of the last `version-prod` branch are merged into the `main` branch;

**Important to always have different version branches alive to have the ability to support that codebase.**

Examples: `0.0.1-prod`, `0.1.0-prod`, `1.0.0-dev`.

## version/feature_FEATURE_NAME branch

Contains new feature development.

Merge strategy:
- Changes are merged into the `version-dev` branch;

Examples: `0.0.2/feature_MacOS-Theme`, `0.0.2/feature_ContextMenu-module`.

## version/bugfix_BUGFIX_NAME branch

Contains bugfix development.

Merge strategy:
- Changes are merged into the `version-dev` branch;

Examples: `0.0.2/bugfix_Grid-Item-incorrect-naming`, `0.0.2/bugfix_Dropdown-Item-disabled-state`.
