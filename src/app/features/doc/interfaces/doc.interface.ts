/* eslint-disable max-lines */
export interface Doc {
    pipes: any[];
    interfaces: DocInterface[];
    injectables: DocInjectable[];
    classes: Class[];
    directives: DocDirective[];
    components: DocComponent[];
    modules: DocModule[];
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
    typealiases: DocTypealias[];
    enumerations: DocEnum[];
    groupedVariables: any;
    groupedFunctions: any;
    groupedEnumerations: GroupedEnumerations;
    groupedTypeAliases: GroupedTypeAliases;
}

interface GroupedTypeAliases {
    [key: string]: DocTypealias[];
}

interface GroupedEnumerations {
    [key: string]: DocEnum[];
}

export interface DocEnum {
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

export interface DocTypealias {
    name: string;
    ctype: string;
    subtype: string;
    rawtype: string;
    file: string;
    description: string;
    kind: number;
}

export interface DocModule {
    name: string;
    children: Child[];
    readme?: string;
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
    readme: string;
    styleUrls: string[];
    styles: any[];
    templateUrl: string[];
    viewProviders: any[];
    inputsClass: InputsClass[];
    outputsClass: OutputsClass[];
    propertiesClass: DocClassProperty[];
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
    accessors?: DocAccessors;
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

export interface MethodsClass {
    name: string;
    args: Arg4[];
    optional: boolean;
    returnType: string;
    typeParameters: any[];
    line: number;
    description?: string;
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

export interface DocClassProperty {
    name: string;
    defaultValue?: string;
    type: string;
    optional: boolean;
    description: string;
    line: number;
    modifierKind: number[];
    decorators?: Decorator[];
    inheritance?: Inheritance;
}

interface Decorator {
    name: string;
    stringifiedArguments: string;
}

export interface DocDirective {
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
    propertiesClass: DocClassProperty[];
    methodsClass: (Methods2 | MethodsClass2)[];
    constructorObj: ConstructorObj2;
    readme?: string;
    implements?: string[];
    accessors?: DocAccessors;
}

export interface DocAccessors {
    [key: string]: DocAccessorValue;
}

interface DocAccessorValue {
    name: string;
    setSignature?: DocSetSignature;
    getSignature?: DocGetSignature;
}

export interface DocSetSignature {
    name: string;
    type: string;
    args: Arg[];
    returnType: string;
    line: number;
    jsdoctags: Jsdoctag[];
    description?: string;
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

export interface OutputsClass {
    name: string;
    line: number;
    type: string;
    defaultValue?: string;
    description?: string;
    inheritance?: Inheritance;
}

export interface InputsClass {
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
    properties: DocClassProperty[];
    methods: (Method2 | Methods2 | Methods3 | Methods4 | Methods5 | Methods6)[];
    indexSignatures: any[];
    extends?: string;
    inputsClass: any[];
    outputsClass: any[];
    hostBindings: any[];
    hostListeners: any[];
    constructorObj?: ConstructorObj;
    implements?: string[];
    accessors?: DocAccessors;
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

interface Inheritance {
    file: string;
}

export interface DocInjectable {
    name: string;
    id: string;
    file: string;
    properties: DocClassProperty[];
    methods: Method[];
    readme?: string;
    description: string;
    sourceCode: string;
    constructorObj: ConstructorObj;
    accessors?: DocAccessors;
    type: string;
}

export interface DocGetSignature {
    name: string;
    type: string;
    returnType: string;
    description?: string;
    line: number;
}

interface ConstructorObj {
    name: string;
    description: string;
    args: Arg[];
    line: number;
    jsdoctags?: Jsdoctag[];
}

export interface Method {
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

export interface DocInterface {
    name: string;
    id: string;
    file: string;
    type: string;
    sourceCode: string;
    properties: DocClassProperty[];
    indexSignatures: any[];
    kind: number;
    methods: DocInterfaceMethod[];
}

export interface DocInterfaceMethod {
    args: {
        name: string;
        type: string;
        deprecated: boolean;
        deprecationMessage: string;
        optional: true;
    }[];
    deprecated: boolean;
    deprecationMessage: string;
    jsdoctags: {
        deprecated: boolean;
        deprecationMessage: string;
        name: string;
        optional: boolean;
        tagName: {
            text: string;
        };
    }[];
    line: number;
    name: string;
    optional: boolean;
    returnType: string;
    typeParameters: string[];
    description?: string;
}
