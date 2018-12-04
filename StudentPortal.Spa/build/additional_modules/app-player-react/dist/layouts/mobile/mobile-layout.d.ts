import * as React from "react";
import { IAppConfig } from "../../app-config";
import { IRunContext } from "../../common/runtime";
import { DisplayedViewInfo } from "../../views/displayed-views-info-producer";
declare type MobileLayoutProps = {
    appConfig: IAppConfig;
    runContext: IRunContext;
    displayedViewsInfo: DisplayedViewInfo[];
};
export declare type ToggleNavigationMenu = (menuVisible: boolean) => void;
export declare const ToggleNavigationMenuContext: React.Context<ToggleNavigationMenu>;
export declare class MobileLayout extends React.PureComponent<MobileLayoutProps, never> {
    private drawer;
    render(): JSX.Element;
    toggleNavigationMenu: (menuVisible: boolean) => void;
}
export {};
//# sourceMappingURL=mobile-layout.d.ts.map