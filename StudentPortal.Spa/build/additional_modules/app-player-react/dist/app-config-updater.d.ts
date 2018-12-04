import * as React from "react";
import { AppState } from "./app-state";
import { IAppConfig } from "./app-config";
import { IGlobalFunctions } from "./common/runtime";
declare type Props = {
    appConfig: IAppConfig;
    appState: AppState;
    children: (updateAppConfig: IGlobalFunctions["updateAppConfig"], appConfig: IAppConfig, updateAppState: IGlobalFunctions["updateAppState"], appState: AppState) => React.ReactChild;
};
declare type State = {
    appConfig: IAppConfig;
    appState: AppState;
    updateAppConfig: IGlobalFunctions["updateAppConfig"];
    updateAppState: IGlobalFunctions["updateAppState"];
};
export declare class AppConfigUpdater extends React.Component<Props, State> {
    constructor(props: Props);
    render(): React.ReactChild;
}
export {};
//# sourceMappingURL=app-config-updater.d.ts.map