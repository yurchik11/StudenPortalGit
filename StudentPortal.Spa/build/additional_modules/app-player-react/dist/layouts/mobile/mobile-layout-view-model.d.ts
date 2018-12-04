import * as React from "react";
import { IAppConfig } from "../../app-config";
import { DisplayedViewInfo } from "../../views/displayed-views-info-producer";
import { IPaneModel } from "../desktop-layout-view-model";
declare type MobileLayoutViewModelResult = {
    rendered: boolean;
    mainPane: IPaneModel;
};
declare type Props = {
    appConfig: IAppConfig;
    children: (layoutViewModel: MobileLayoutViewModelResult) => React.ReactElement<any>;
};
export declare class MobileLayoutViewModel extends React.Component<Props, never> {
    render(): JSX.Element;
    static createLayoutViewModel(displayedViewsInfo: DisplayedViewInfo[], appConfig: IAppConfig): MobileLayoutViewModelResult;
    static getTopPane(displayedViewsInfo: DisplayedViewInfo[]): DisplayedViewInfo;
}
export {};
//# sourceMappingURL=mobile-layout-view-model.d.ts.map