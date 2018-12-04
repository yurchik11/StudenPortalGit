import { IRunContext } from "../common/runtime";
import { ICallerInfo } from "../logic/function-compiler";
export declare type ObservablesHolder = {
    expression: string;
    propPath: string;
    propName: string;
    value: {};
    subscribe(callback: (val: any) => void): any;
    dispose(): any;
    pushObservable(obs: any): void;
};
export declare type ObservablesProvider = {
    _observables: ObservablesHolder[];
};
export default function createLinkedModel<C>(config: C, runContext: IRunContext, callerInfo?: ICallerInfo): C & ObservablesProvider;
export declare function createObservableHolder(initialValue: any, expression: string, runContext: IRunContext, valueContext: any): ObservablesHolder;
export declare function isExpression(expression: any): expression is string;
//# sourceMappingURL=linked-model.d.ts.map