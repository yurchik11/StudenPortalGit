import { IRunContext } from "../common/runtime";
import { ICallerInfo } from "../logic/function-compiler";
export declare function continueFunc<T>(func: ((arg: T) => T), continulation: ((arg: T) => T)): (arg: T) => T;
export declare function pipe(...funcs: ((arg: any) => any)[]): (arg: any) => any;
export declare function compose(...funcs: ((arg: any) => any)[]): (arg: any) => any;
export declare function clone<T>(value: T): T;
export declare function getQueryVariables(locationSearch?: string): any;
export declare function getQueryVariable(variable: string, locationSearch?: string): string;
export declare function getModelValue(expr: string, runContext: IRunContext, callerInfo: ICallerInfo): any;
export declare function compileExpression(expr: string, callerInfo: ICallerInfo): (runContext: IRunContext) => any;
export declare function isEmptyObject(obj: any): boolean;
export declare function compileGetter(expr: string, fullExpr?: string, src?: any): (obj: any) => any;
export { compileSetter } from "devextreme/utils";
export declare function shorten(value: string, length: number, ending?: string): string;
export declare function replaceAll(str: string, token: string, newToken: string): string;
export declare function setOrPush<T>(values: T[], predicate: (value: T, index: number, obj: T[]) => boolean, value: T): T[];
//# sourceMappingURL=index.d.ts.map