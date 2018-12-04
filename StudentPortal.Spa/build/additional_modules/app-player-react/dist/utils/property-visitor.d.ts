export interface IPropertyVisitorValueCallback {
    (context: IPropertyVisitorContext, path?: string): any;
}
export interface IPropertyVisitorContext {
    path?: string;
    name?: string;
    value?: any;
    isArray?: boolean;
    owner?: any;
    original?: any;
    getValueCallback: (value: any, context: IPropertyVisitorContext) => any;
}
export declare function propertyVisitor<T>(target: T, valueCallback: IPropertyVisitorValueCallback, initialContext?: IPropertyVisitorContext): T;
//# sourceMappingURL=property-visitor.d.ts.map