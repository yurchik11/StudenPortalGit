import { IRunContext } from "../common/runtime";
import { showError } from "../utils/errors";
import { LogicError } from "./operations";
export declare var logEnabled: boolean;
export interface ICallerInfo {
    callerType: string;
    callerId: string;
}
export declare type IFunctionCode = Function | string;
export declare type FunctionCodeHolder = {
    $code: IFunctionCode;
};
export declare type FunctionErrorHandler = (error: LogicError) => void;
export declare class FunctionCompiler {
    private strategy;
    private code;
    private externalErrorHandler;
    static isCodeHandler(code: any): boolean;
    constructor(code: IFunctionCode | FunctionCodeHolder, errorHandler?: typeof showError);
    run(runContext?: IRunContext, callerInfo?: ICallerInfo): Promise<any> | any;
    private createStrategy;
}
//# sourceMappingURL=function-compiler.d.ts.map