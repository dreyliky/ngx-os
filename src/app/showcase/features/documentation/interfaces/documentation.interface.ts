// FIXME: All interfaces were auto-generated.
// Need to reduce the number of duplicate interfaces.
// Each exported interface should have a "Doc" prefix.
export interface Doc {
    pipes: any[];
    interfaces: DocInterface[];
    injectables: DocInjectable[];
    classes: DocClass[];
    directives: DocDirective[];
    components: DocComponent[];
    modules: DocModule[];
    miscellaneous: Miscellaneous;
    routes: any[];
}

interface Miscellaneous {
    variables: DocVariable[];
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
    description?: string;
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
    methodsClass: DocMethod[];
    hostBindings: any[];
    hostListeners: HostListener[];
    description?: string;
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

export interface DocVariable {
    name: string;
    type: string;
    defaultValue: string;
    description?: string;
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
    description?: string;
    sourceCode: string;
    selector: string;
    providers: any[];
    inputsClass: InputsClass[];
    outputsClass: OutputsClass[];
    hostBindings: any[];
    hostListeners: any[];
    propertiesClass: DocClassProperty[];
    methodsClass: DocMethod[];
    constructorObj: ConstructorObj;
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

export interface DocClass {
    name: string;
    id: string;
    file: string;
    type: string;
    sourceCode: string;
    properties: DocClassProperty[];
    methods: DocMethod[];
    indexSignatures: any[];
    extends?: string;
    inputsClass: any[];
    outputsClass: any[];
    hostBindings: any[];
    hostListeners: any[];
    constructorObj?: ConstructorObj;
    implements?: string[];
    accessors?: DocAccessors;
    description?: string;
    readme?: string;
}

interface Inheritance {
    file: string;
}

export interface DocInjectable {
    name: string;
    id: string;
    file: string;
    properties: DocClassProperty[];
    methods: DocMethod[];
    readme?: string;
    description?: string;
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

export interface DocMethod {
    name: string;
    args: Arg[];
    optional: boolean;
    returnType: string;
    typeParameters: any[];
    line: number;
    modifierKind: number[];
    description?: string;
    jsdoctags?: Jsdoctag[];
    inheritance?: Inheritance;
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
    optional: boolean;
    defaultValue?: string;
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
    methods: DocMethod[];
    description?: string;
    readme?: string;
}
