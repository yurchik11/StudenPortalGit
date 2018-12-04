import { IDataStore } from "../app-config";
export declare enum TYPES {
    PRIMITIVE_TYPE = 0,
    ARRAY_TYPE = 1,
    OBJECT_TYPE = 2,
    STORE_TYPE = 3,
    TYPED_OBJECT = 4
}
export interface ITypeInfo {
    name: string;
    displayName?: string;
    kind: TYPES;
    defaultValueCtor: () => any;
    keyProperty?: IPropertyInfo;
    properties?: IPropertyInfo[];
    nestedType?: ITypeInfo;
    toUIString(value: any): string;
}
export interface IPropertyInfo {
    name: string;
    type: ITypeInfo;
}
export declare function odataToJsonType(odataType: string): "object" | "string" | "number" | "boolean";
export declare class TypeInfoRepository {
    static readonly BOOLEAN: string;
    static readonly OBJECT: string;
    static hasProperties(t: ITypeInfo): boolean;
    private types;
    constructor(storesConfig?: IDataStore[]);
    get(typeName: string): ITypeInfo;
    getAll(): ITypeInfo[];
    storeId(typeName: string): string;
    addTypedObjectType(typeInfo: ITypeInfo): void;
    private addStoreTypes;
    private defaultObjectCtor;
    private createListType;
    private addWithList;
    _add(type: ITypeInfo): void;
}
//# sourceMappingURL=types.d.ts.map