import "../../css/layouts/desktop-layout.css";
import * as React from "react";
import { IAppConfig } from "../app-config";
import { IRunContext } from "../common/runtime";
import { DisplayedViewInfo } from "../views/displayed-views-info-producer";
declare type DesktopLayoutState = {
    navigationItemsSelector: any;
    navigationItems: any;
};
declare type DesktopLayoutProps = {
    appConfig: IAppConfig;
    runContext: IRunContext;
    displayedViewsInfo: DisplayedViewInfo[];
};
export declare class DesktopLayout extends React.PureComponent<DesktopLayoutProps, DesktopLayoutState> {
    constructor(props: any);
    static getDerivedStateFromProps(nextProps: DesktopLayoutProps, prevState: DesktopLayoutState): {
        navigationItems: any;
        navigationItemsSelector: any;
    };
    render(): JSX.Element;
}
export {};
//# sourceMappingURL=desktop-layout.d.ts.map