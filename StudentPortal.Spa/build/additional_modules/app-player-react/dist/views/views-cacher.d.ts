import * as React from "react";
import { AppState } from "../app-state";
import { IRunContext } from "../common/runtime";
import { ModelServices } from "../model/model";
import { IRefreshStrategy } from "../model/refresh-strategies";
import { ServiceParametersProcessor } from "../navigation/router-api";
import { ServiceStores } from "../services";
import { DisplayedViewInfo } from "./displayed-views-info-producer";
export declare type ViewsCacherState = {
    items: ViewCacherItem[];
    updateComplete?: Promise<DisplayedViewInfo>;
    refreshStrategies: {
        [key: string]: IRefreshStrategy[];
    };
};
export declare type ViewCacherItem = {
    viewInfo: DisplayedViewInfo;
    hidden: boolean;
};
declare type ViewsCacherProps = {
    displayedViewInfo: DisplayedViewInfo;
    children: (viewInfo: DisplayedViewInfo) => React.ReactChild;
} & ServiceParametersProcessor & {
    runContext: IRunContext;
} & AppState & ModelServices & ServiceStores;
export declare class ViewsCacher extends React.Component<ViewsCacherProps, ViewsCacherState> {
    constructor(props: ViewsCacherProps);
    static getDerivedStateFromProps(nextProps: ViewsCacherProps, prevState: ViewsCacherState): Partial<ViewsCacherState>;
    render(): JSX.Element[];
    private renderView;
    componentDidMount(): void;
    shouldComponentUpdate(nextProps: ViewsCacherProps, nextState: ViewsCacherState): boolean;
    private getShownViewInfo;
    componentDidUpdate(prevProps: ViewsCacherProps, prevState: ViewsCacherState): void;
    componentWillUnmount(): void;
    private updateCachedInfos;
    private clearCachedInfos;
}
export {};
//# sourceMappingURL=views-cacher.d.ts.map