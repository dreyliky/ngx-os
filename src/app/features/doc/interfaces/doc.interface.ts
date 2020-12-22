export interface Doc {
    pipes: any[];
    interfaces: Interface[];
    injectables: Injectable[];
    classes: Class[];
    directives: Directive[];
    components: DocComponent[];
    modules: Module[];
    miscellaneous: Miscellaneous;
    routes: any[];
    coverage: Coverage;
}

interface Coverage {
    count: number;
    status: string;
    files: File[];
}

interface File {
    filePath: string;
    type: string;
    linktype: string;
    name: string;
    coveragePercent: number;
    coverageCount: string;
    status: string;
}

interface Miscellaneous {
    variables: any[];
    functions: any[];
    typealiases: Typealias[];
    enumerations: Enumeration[];
    groupedVariables: GroupedVariables;
    groupedFunctions: GroupedVariables;
    groupedEnumerations: GroupedEnumerations;
    groupedTypeAliases: GroupedTypeAliases;
}

interface GroupedTypeAliases {
    [key: string]: Typealias[];
}

interface GroupedEnumerations {
    [key: string]: Enumeration[];
}

interface GroupedVariables {
}

interface Enumeration {
    name: string;
    childs: Child2[];
    ctype: string;
    subtype: string;
    description: string;
    file: string;
}

interface Child2 {
    name: string;
    value: string;
}

interface Typealias {
    name: string;
    ctype: string;
    subtype: string;
    rawtype: string;
    file: string;
    description: string;
    kind: number;
}

interface Module {
    name: string;
    children: Child[];
}

interface Child {
    type: string;
    elements: Element[][];
}

interface Element {
    name: string;
}

export interface DocComponent {
    name: string;
    id: string;
    file: string;
    changeDetection?: string;
    encapsulation: any[];
    entryDocComponents: any[];
    inputs: any[];
    outputs: any[];
    providers: any[];
    selector: string;
    styleUrls: string[];
    styles: any[];
    templateUrl: string[];
    viewProviders: any[];
    inputsClass: InputsClass[];
    outputsClass: OutputsClass[];
    propertiesClass: (PropertiesClass | PropertiesClass2 | Property3 | Property2)[];
    methodsClass: MethodsClass[];
    hostBindings: any[];
    hostListeners: HostListener[];
    description: string;
    rawdescription: string;
    type: string;
    sourceCode: string;
    assetsDirs: any[];
    styleUrlsData: StyleUrlsDatum[];
    stylesData: string;
    constructorObj: ConstructorObj;
    extends?: string;
    implements: string[];
    templateData: string;
    accessors?: Accessors4;
}

interface Accessors4 {
    size?: DraggerConfig;
    data?: DraggerConfig;
}

interface StyleUrlsDatum {
    data: string;
    styleUrl: string;
}

interface HostListener {
    name: string;
    args: Arg[];
    argsDecorator: string[];
    line: number;
}

interface MethodsClass {
    name: string;
    args: Arg4[];
    optional: boolean;
    returnType: string;
    typeParameters: any[];
    line: number;
    modifierKind: number[];
    jsdoctags?: Jsdoctag4[];
}

interface Jsdoctag4 {
    name: string;
    type: string;
    tagName: TagName;
    defaultValue?: string;
}

interface Arg4 {
    name: string;
    type: string;
    defaultValue?: string;
}

interface PropertiesClass2 {
    name: string;
    type: string;
    optional: boolean;
    description: string;
    line: number;
    decorators: Decorator[];
    modifierKind: number[];
}

interface PropertiesClass {
    name: string;
    defaultValue?: string;
    type: string;
    optional: boolean;
    description: string;
    line: number;
    modifierKind: number[];
    decorators?: Decorator[];
}

interface Decorator {
    name: string;
    stringifiedArguments: string;
}

interface InputsClass2 {
    name: string;
    line: number;
    type: string;
    defaultValue?: string;
}

interface Directive {
    name: string;
    id: string;
    file: string;
    type: string;
    description: string;
    sourceCode: string;
    selector: string;
    providers: any[];
    inputsClass: InputsClass[];
    outputsClass: OutputsClass[];
    hostBindings: any[];
    hostListeners: any[];
    propertiesClass: Properties4[];
    methodsClass: (Methods2 | MethodsClass2)[];
    constructorObj: ConstructorObj2;
    implements?: string[];
    accessors?: Accessors3;
}

interface Accessors3 {
    draggerConfig?: DraggerConfig;
    resizerConfig?: DraggerConfig;
    resizableElement?: ActiveWindowId;
    resizerElement?: ActiveWindowId;
}

interface DraggerConfig {
    name: string;
    setSignature: SetSignature;
    getSignature: GetSignature;
}

interface SetSignature {
    name: string;
    type: string;
    args: Arg[];
    returnType: string;
    line: number;
    jsdoctags: Jsdoctag[];
}

interface ConstructorObj2 {
    name: string;
    description: string;
    args: Arg[];
    line: number;
    jsdoctags: Jsdoctag[];
}

interface MethodsClass2 {
    name: string;
    args: any[];
    optional: boolean;
    returnType: string;
    typeParameters: any[];
    line: number;
    modifierKind: number[];
}

interface OutputsClass {
    name: string;
    line: number;
    type: string;
    defaultValue?: string;
    description?: string;
    inheritance?: Inheritance;
}

interface InputsClass {
    name: string;
    line: number;
    type: string;
    defaultValue?: string;
    description?: string;
    inheritance?: Inheritance;
}

interface Class {
    name: string;
    id: string;
    file: string;
    type: string;
    sourceCode: string;
    properties: (Property3 | Property2 | Properties3 | Properties4)[];
    methods: (Method2 | Methods2 | Methods3 | Methods4 | Methods5 | Methods6)[];
    indexSignatures: any[];
    extends?: string;
    inputsClass: any[];
    outputsClass: any[];
    hostBindings: any[];
    hostListeners: any[];
    constructorObj?: ConstructorObj;
    implements?: string[];
    accessors?: Accessors2;
}

interface Accessors2 {
    'isHidden$': ActiveWindowId;
    isHidden: ActiveWindowId;
    isFullscreen: ActiveWindowId;
    'isFullscreen$': ActiveWindowId;
    'afterClosed$': ActiveWindowId;
    'config$': ActiveWindowId;
    config: ActiveWindowId;
    windowElement: ActiveWindowId;
    'windowElement$': ActiveWindowId;
}

interface Methods6 {
    name: string;
    args: (Arg | Args2)[];
    optional: boolean;
    returnType: string;
    typeParameters: any[];
    line: number;
    modifierKind: number[];
    jsdoctags?: Jsdoctag2[];
}

interface Args2 {
    name: string;
    type: string;
    optional: boolean;
}

interface Methods5 {
    name: string;
    args: Arg3[];
    optional: boolean;
    returnType: string;
    typeParameters: any[];
    line: number;
    modifierKind: number[];
    jsdoctags: Jsdoctag3[];
}

interface Jsdoctag3 {
    name: string;
    type: string;
    defaultValue: string;
    tagName: TagName;
}

interface Arg3 {
    name: string;
    type: string;
    defaultValue: string;
}

interface Methods4 {
    name: string;
    args: Arg[];
    optional: boolean;
    returnType: string;
    typeParameters: any[];
    line: number;
    modifierKind: number[];
    jsdoctags: Jsdoctag[];
}

interface Methods3 {
    name: string;
    args: Arg[];
    optional: boolean;
    returnType: string;
    typeParameters: any[];
    line: number;
    modifierKind: number[];
    jsdoctags?: Jsdoctag[];
    inheritance?: Inheritance;
}

interface Methods2 {
    name: string;
    args: Arg[];
    optional: boolean;
    returnType: string;
    typeParameters: any[];
    line: number;
    modifierKind: number[];
    jsdoctags?: Jsdoctag[];
}

interface Method2 {
    name: string;
    args: Arg2[];
    optional: boolean;
    returnType: string;
    typeParameters: string[];
    line: number;
    modifierKind: number[];
    jsdoctags: Jsdoctag2[];
}

interface Jsdoctag2 {
    name: string;
    type: string;
    tagName: TagName;
    optional?: boolean;
}

interface Arg2 {
    name: string;
    type: string;
    optional?: boolean;
}

interface Properties4 {
    name: string;
    defaultValue?: string;
    type: string;
    optional: boolean;
    description: string;
    line: number;
    modifierKind: number[];
}

interface Properties3 {
    name: string;
    type: string;
    optional: boolean;
    description: string;
    line: number;
    modifierKind: number[];
    inheritance: Inheritance;
}

interface Inheritance {
    file: string;
}

interface Property3 {
    name: string;
    type: string;
    optional: boolean;
    description: string;
    line: number;
    modifierKind: number[];
}

interface Injectable {
    name: string;
    id: string;
    file: string;
    properties: Property2[];
    methods: Method[];
    description: string;
    sourceCode: string;
    constructorObj: ConstructorObj;
    accessors?: Accessors;
    type: string;
}

interface Accessors {
    'activeWindowId$': ActiveWindowId;
    'windowIdsOrder$': ActiveWindowId;
    'windowDocComponentsRef$': ActiveWindowId;
}

interface ActiveWindowId {
    name: string;
    getSignature: GetSignature;
}

interface GetSignature {
    name: string;
    type: string;
    returnType: string;
    line: number;
}

interface ConstructorObj {
    name: string;
    description: string;
    args: Arg[];
    line: number;
    jsdoctags?: Jsdoctag[];
}

interface Method {
    name: string;
    args: (Arg | Arg)[];
    optional: boolean;
    returnType: string;
    typeParameters: any[];
    line: number;
    modifierKind: number[];
    jsdoctags?: Jsdoctag[];
}

interface Jsdoctag {
    name: string;
    type: string;
    tagName: TagName;
}

interface TagName {
    text: string;
}

interface Arg {
    name: string;
    type: string;
}

interface Property2 {
    name: string;
    defaultValue: string;
    type: string;
    optional: boolean;
    description: string;
    line: number;
    modifierKind: number[];
}

interface Interface {
    name: string;
    id: string;
    file: string;
    type: string;
    sourceCode: string;
    properties: Property[];
    indexSignatures: any[];
    kind: number;
    methods: any[];
}

interface Property {
    name: string;
    type: string;
    optional: boolean;
    description: string;
    line: number;
}
