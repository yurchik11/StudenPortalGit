import { IAppConfig, IParameter, IView } from "../app-config";
import { TypeInfoRepository } from "../logic/types";
import { History } from "history";
import { IRunContext } from "../common/runtime";
export declare type RouterApi = {
    navigateToView(viewId: string, params?: {
        [key: string]: any;
    }): any;
    navigateToDefaultView(runContext: IRunContext): any;
    navigateBack(): any;
};
export declare function createRouterApi(history: History, appConfig: IAppConfig, parametersProcessor: ParametersProcessor): RouterApi;
export declare type ServiceParametersProcessor = {
    parametersProcessor: ParametersProcessor;
};
export declare class ParametersProcessor {
    private typeInfoRepository;
    private stores;
    private sharedObjects;
    static readonly SHARED_OBJECT_KEY: string;
    constructor(typeInfoRepository?: TypeInfoRepository, stores?: {
        [name: string]: dxdata.Store;
    }, sharedObjects?: {
        [viewId: string]: {
            [key: string]: any;
        };
    });
    toModelValues(viewConfig: {
        id: string;
        params?: IParameter[];
    }, routeValues: {}, runContext: IRunContext, paramNames?: string[]): Promise<{}>;
    private toModelValue;
    toNavigationValues(viewConfig: IView, modelValues?: {}): {};
    private toNavigationValue;
}
//# sourceMappingURL=router-api.d.ts.map