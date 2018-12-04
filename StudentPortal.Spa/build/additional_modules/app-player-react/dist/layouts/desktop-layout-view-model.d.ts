import * as React from "react";
import { IAppConfig } from "../app-config";
import { IRunContext } from "../common/runtime";
import { RoutingPart } from "../navigation/routing-parts";
import { DisplayedViewInfo } from "../views/displayed-views-info-producer";
export interface IPaneModel {
    name: string;
    visible: boolean;
    viewToolbar?: {
        items: any[];
    };
    displayedViewInfo: DisplayedViewInfo;
}
export interface RoutingPartWithPane extends DisplayedViewInfo {
    pane: string;
}
export interface IDesktopLayoutViewModel {
    rendered: boolean;
    globalToolbar: {
        items: any[];
    };
    mainPane: IPaneModel;
    previewPane: IPaneModel;
    popupPane: IPaneModel;
    simplePopupPane: IPaneModel;
}
declare type Props = {
    children: (desktopViewModel: IDesktopLayoutViewModel) => React.ReactChild;
    displayedViewsInfo: DisplayedViewInfo[];
    appConfig: IAppConfig;
    runContext: IRunContext;
};
declare type State = {};
export declare class DesktopLayoutViewModel extends React.Component<Props, State> {
    render(): React.ReactChild;
    createDesktopLayoutViewModel(displayedViewsInfo: DisplayedViewInfo[], appConfig: IAppConfig, runContext: IRunContext): {
        rendered: boolean;
        globalToolbar: {
            items: any;
        };
        mainPane: {
            visible: boolean;
            name: string;
            displayedViewInfo: DisplayedViewInfo;
        };
        previewPane: {
            visible: boolean;
            name: string;
            displayedViewInfo: DisplayedViewInfo;
        };
        simplePopupPane: {
            visible: boolean;
            name: string;
            displayedViewInfo: DisplayedViewInfo;
        };
        popupPane: {
            visible: boolean;
            name: string;
            displayedViewInfo: DisplayedViewInfo;
        };
    };
    getViewForPane(displayedViewsInfo: DisplayedViewInfo[], pane: string): DisplayedViewInfo;
    getPaneValue(routingPart: RoutingPart, indexInRoutingParts?: any): string;
    getTopPane(displayedViewsInfo: DisplayedViewInfo[], pane: string): {
        displayedViewInfo: DisplayedViewInfo;
        index: number;
    };
}
export {};
//# sourceMappingURL=desktop-layout-view-model.d.ts.map