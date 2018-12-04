import "../../../css/layouts/desktop-layout.css";
import * as React from "react";
import { IAppConfig } from "../../app-config";
import { IRunContext } from "../../common/runtime";
import { DisplayedViewInfo } from "../../views/displayed-views-info-producer";
declare type State = {
    navigationItemsSelector: any;
    navigationItems: any;
};
declare type Props = {
    appConfig: IAppConfig;
    runContext: IRunContext;
    displayedViewsInfo: DisplayedViewInfo[];
};
export declare class TabletLayout extends React.PureComponent<Props, State> {
    constructor(props: any);
    static getDerivedStateFromProps(nextProps: Props, prevState: State): {
        navigationItems: any;
        navigationItemsSelector: any;
    };
    render(): JSX.Element;
}
export {};
//# sourceMappingURL=tablet-layout.d.ts.map