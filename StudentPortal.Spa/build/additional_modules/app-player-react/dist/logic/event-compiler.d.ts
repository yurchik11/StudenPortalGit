import { IRunContext } from "../common/runtime";
export declare function extractWidgetEventHandlers(config: any): {};
export declare type ItemHolder = {
    __originalItem: any;
};
export declare function createRunContextWithItem(runContext: any, data: ItemHolder): any;
export default function compileEventHandlers(config: any, runContext: IRunContext | ((e: any) => IRunContext)): any;
//# sourceMappingURL=event-compiler.d.ts.map