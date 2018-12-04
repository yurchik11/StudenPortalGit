import * as React from "react";
import { AppState } from "../app-state";
import { IRunContext } from "../common/runtime";
import { ModelServices } from "../model/model";
import { ServiceParametersProcessor } from "../navigation/router-api";
import { RoutingPart } from "../navigation/routing-parts";
import { ServiceStores } from "../services";
import { IAppConfig } from "../app-config";
export declare type DisplayedViewInfo = {
    routingPart: RoutingPart;
    isReady?: boolean;
    $local: IRunContext["$local"];
};
declare type Props = {
    routingParts: RoutingPart[];
    runContext: IRunContext;
    appConfig: IAppConfig;
} & ServiceParametersProcessor & ModelServices & AppState & ServiceStores;
declare type State = {
    parametersUpdatesQuery: UpdatesQuery;
    resultViewsInfo: DisplayedViewInfo[];
    viewsInfoToUpdateCount: number;
};
declare type UpdatesQuery = {
    [key: string]: Promise<DisplayedViewInfo>;
};
export declare class DisplayedViewsInfoProducer extends React.Component<Props, State> {
    constructor(p: any);
    static getViewInfoToUpdate(routingPart: RoutingPart, updatesQuery: UpdatesQuery, appState: AppState): DisplayedViewInfo;
    static getDerivedStateFromProps(nextProps: Props, prevState: State): State;
    static getUpdatedDisplayedViewsInfo(displayedViewsInfo: DisplayedViewInfo[], viewInfo: DisplayedViewInfo): DisplayedViewInfo[];
    private syncWithRoutingParts;
    private updateAppStateDisplayedViewsInfo;
    private parametersUpdateComplete;
    shouldComponentUpdate(nextProps: Props, nextState: State): boolean;
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): React.ReactNode;
}
export {};
//# sourceMappingURL=displayed-views-info-producer.d.ts.map