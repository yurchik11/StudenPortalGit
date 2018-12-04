import { ActionResponse } from "./xaf-data-store";
import { IRunContext } from "app-player-react/dist/common/runtime";
export declare function defaultPostProcess({ currentObject, viewState, newViewState }: ActionResponse, { $functions }: IRunContext, collectionContext: any): Promise<void>;
export declare type ActionExecuteParams = {
    actionId: any;
    actionParameter?: any;
    propertyName?: any;
};
declare type getActionExecuteResult = (runContext: IRunContext & {
    $event?: any;
    $focusedItem?: any;
}) => Promise<any>;
export declare function getActionExecute(actionOptions: ActionExecuteParams): getActionExecuteResult;
export {};
//# sourceMappingURL=actions.d.ts.map