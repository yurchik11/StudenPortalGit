import * as React from "react";
import { IAppConfig } from "./app-config";
import { IRunContext, IAuthApi } from "./common/runtime";
import { IModelStorage } from "./model/model-storage";
import { IServices } from "./services";
export declare class ServicesCreator extends React.Component<{
    appConfig: IAppConfig;
    updateAppConfig(diffConfig: any): void;
    updateAppState(nextState: any): void;
    children: ({ authenticated, services }: {
        authenticated: any;
        services: any;
    }) => React.ReactChild;
}, any> {
    _createServices(appConfig: IAppConfig): Promise<{
        services: IServices;
        runContext: IRunContext;
    }>;
    createAuthApi(modelStorage: IModelStorage): IAuthApi;
    private component;
    constructor(props: any);
    shouldComponentUpdate(nextProps: any, nextState: any): boolean;
    render(): JSX.Element;
    busy: () => void;
    available: () => void;
}
//# sourceMappingURL=services-creator.d.ts.map