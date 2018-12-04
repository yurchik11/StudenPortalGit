import { ICallerInfo } from "./function-compiler";
export declare class AppPlayerError extends Error {
    message: any;
    constructor(message: any, prototype?: AppPlayerError);
}
export declare class LogicError extends AppPlayerError {
    callerInfo?: ICallerInfo;
    constructor(message: string, callerInfo?: ICallerInfo);
}
export declare class DataLogicError extends AppPlayerError {
    data: any;
    callerInfo?: ICallerInfo;
    constructor(data: any, callerInfo?: ICallerInfo);
}
//# sourceMappingURL=operations.d.ts.map