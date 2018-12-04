import * as React from "react";
import { NavigationItem } from "../../app-config";
import { ComponentWithStyleProps } from "../../widgets/with-style";
import { ComponentBaseProps } from "../../common/base-component";
declare type NavbarListSectionProps = ComponentBaseProps & ComponentWithStyleProps & {
    items: NavigationItem[];
    tabIndex?: number;
    selectedItems: NavigationItem[];
    onExpand?: (item: NavigationItem) => void;
    onItemClick?: (item: NavigationItem) => void;
};
export declare class NavbarListSection extends React.PureComponent<NavbarListSectionProps, never> {
    ref: React.RefObject<any>;
    render(): JSX.Element;
    componentDidMount(): void;
    componentDidUpdate(): void;
    private onItemClickSelector;
    private changeItemSelection;
}
export {};
//# sourceMappingURL=navbar-list-section.d.ts.map