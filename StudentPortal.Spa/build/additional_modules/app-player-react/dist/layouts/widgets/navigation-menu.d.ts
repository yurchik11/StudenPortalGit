import * as React from "react";
import { NavigationItem } from "../../app-config";
import { IRunContext } from "../../common/runtime";
export declare function compileNavigationHandlers(items: NavigationItem[], runContext: IRunContext, postOnExecuteHandler?: Function): any;
export declare function findActiveItem(items: NavigationItem[]): NavigationItem;
declare type NavigationMenuProps = {
    title?: string;
    items: NavigationItem[];
    compact?: boolean;
    applicationInfo?: any;
};
declare type NavigationMenuState = {
    compact: boolean;
    collapsed: boolean;
    currentItem?: NavigationItem;
    prevProps?: Partial<NavigationMenuProps>;
};
export declare class NavigationMenu extends React.PureComponent<NavigationMenuProps, NavigationMenuState> {
    constructor(props: any);
    static getDerivedStateFromProps(props: NavigationMenuProps, state: NavigationMenuState): Partial<NavigationMenuState>;
    render(): JSX.Element;
    collapse: () => void;
    expand: (section: NavigationItem) => void;
    toggleCompact: () => void;
}
export {};
//# sourceMappingURL=navigation-menu.d.ts.map