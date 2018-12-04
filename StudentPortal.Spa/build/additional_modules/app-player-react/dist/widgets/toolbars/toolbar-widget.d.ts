import * as React from "react";
import { ReactToolbarBaseProps, ReactToolbarItem } from "./toolbar-base-widget";
export declare type ReactToolbarState = {
    displayedItem: ReactToolbarItem;
};
export declare class ReactToolbar extends React.PureComponent<ReactToolbarBaseProps, ReactToolbarState> {
    state: {
        displayedItem: any;
    };
    private static isPopupDisplayingCommand;
    private static extractWidgetOptions;
    private itemsSelector;
    private detailToolbarBackButton;
    private onClickInMenuHandlers;
    private displayItem;
    private patchToMenuItem;
    render(): JSX.Element;
}
//# sourceMappingURL=toolbar-widget.d.ts.map