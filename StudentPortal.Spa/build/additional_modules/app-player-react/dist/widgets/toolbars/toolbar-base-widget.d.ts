import { IToolbarOptions } from "devextreme-react/ui/toolbar";
import * as React from "react";
import { Command } from "../info/commands-info";
import { ComponentWithStyleProps } from "../with-style";
import { ComponentBaseProps } from "../../common/base-component";
export declare type ReactToolbarItem<T = ComponentBaseProps & {
    icon?: string;
    text?: string;
    onHide?: any;
    onExecute?: any;
}> = {
    disabled?: boolean;
    visible?: boolean;
    options?: T;
} & Partial<Pick<Command, "locateInMenu" | "locateInMenuOptions" | "showText" | "location" | "template" | "menuItemTemplate">>;
export declare type MenuItem = ReactToolbarItem & {
    onItemClickInMenu: any;
    showArrow?: boolean;
};
export declare type ReactToolbarBaseProps = ComponentBaseProps & ComponentWithStyleProps & IToolbarOptions & {
    children?: React.ReactNode;
    items: ReactToolbarItem[];
};
export declare function renderItem(item: ReactToolbarItem): JSX.Element;
export declare function renderMenuItem(item: MenuItem): JSX.Element;
export declare class ReactToolbarBase extends React.Component<ReactToolbarBaseProps, {}> {
    static renderToolbar(toolbarProps: ReactToolbarBaseProps): JSX.Element;
    render(): JSX.Element;
}
export declare const ReactToolbarBaseWithTheme: React.StatelessComponent<import("app-player-react/src/common/base-component").VisibleProps & import("app-player-react/src/common/base-component").DisableProps & {
    id?: string;
    type?: string;
} & ComponentWithStyleProps & IToolbarOptions & {
    children?: React.ReactNode;
    items: ReactToolbarItem<import("app-player-react/src/common/base-component").VisibleProps & import("app-player-react/src/common/base-component").DisableProps & {
        id?: string;
        type?: string;
    } & {
        icon?: string;
        text?: string;
        onHide?: any;
        onExecute?: any;
    }>[];
} & import("app-player-react/src/widgets/with-theme").ThemeProvider>;
//# sourceMappingURL=toolbar-base-widget.d.ts.map