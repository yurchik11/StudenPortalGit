import * as React from "react";
import { ComponentWithStyleProps } from "../with-style";
import { ReactToolbarItem } from "./toolbar-base-widget";
export declare type ReactDetailToolbarProps = ComponentWithStyleProps & {
    backButton: ReactToolbarItem;
    item: ReactToolbarItem;
    visible: boolean;
};
export declare type ReactDetailToolbarState = {};
export declare class ReactValueToolbar extends React.PureComponent<ReactDetailToolbarProps, ReactDetailToolbarState> {
    private itemsSelector;
    private separateStyles;
    private styleSelector;
    render(): JSX.Element;
}
//# sourceMappingURL=detail-toolbar.d.ts.map