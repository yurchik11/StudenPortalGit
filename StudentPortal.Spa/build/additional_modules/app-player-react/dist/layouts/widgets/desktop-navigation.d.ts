import * as React from "react";
import { ComponentWithStyleProps } from "../../widgets/with-style";
import { Breadcrumb } from "../../navigation/breadcrumbs";
import { AppState } from "../../app-state";
import { IRunContext } from "../../common/runtime";
export declare type DesktopNavigation = {
    pane: string;
};
declare type Props = DesktopNavigation & ComponentWithStyleProps & {
    runContext?: IRunContext;
    appState?: AppState;
};
declare type State = Partial<{
    top: string;
    bottom: string;
}>;
export default class ReactDesktopNavigation extends React.PureComponent<Props, State> {
    constructor(props: any);
    private subscriptions;
    separateBreadcrumbs(breadcrumbs?: Breadcrumb[]): State;
    refreshSubscription(breadcrumbs?: Breadcrumb[]): void;
    render(): JSX.Element;
    componentWillUnmount(): void;
}
export {};
//# sourceMappingURL=desktop-navigation.d.ts.map