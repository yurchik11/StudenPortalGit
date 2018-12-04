import * as React from "react";
import { OriginalConfigProvider } from "../../model/hem-original-config";
import { ComponentWithStyleProps } from "../with-style";
export declare type SingleChoiceActionItem = {
    id?: string;
    icon?: string;
    active?: boolean;
    tooltip?: string;
    items?: SingleChoiceActionItem[];
    text?: string;
    parent?: SingleChoiceActionItem;
    onExecute?: any;
};
export declare type SingleChoiceAction = {
    items: SingleChoiceActionItem[];
    showText?: boolean;
    actionText?: string;
    actionIcon?: string;
    tooltip?: string;
    defaultItemMode?: "FirstActiveItem" | "LastExecutedItem";
    showItemsOnClick?: boolean;
    onExecute?: any;
    onHide?: any;
};
declare type Props = ComponentWithStyleProps & OriginalConfigProvider & SingleChoiceAction;
declare type State = {
    firstActiveItem: SingleChoiceActionItem;
    lastExecutedItem: SingleChoiceActionItem;
    lastExcutedLeafItem: SingleChoiceActionItem;
};
export default class ReactSingleChoiceAction extends React.Component<Props, State> {
    static defaultProps: {
        _originalConfig: {};
    };
    static mapItems(items?: SingleChoiceActionItem[], parent?: any): {
        parent: any;
        id?: string;
        icon?: string;
        active?: boolean;
        tooltip?: string;
        items?: SingleChoiceActionItem[];
        text?: string;
        onExecute?: any;
    }[];
    state: State;
    protected menuItemsSelector: import("reselect").OutputSelector<Props, {
        items: any;
    }[], (res: SingleChoiceActionItem[]) => {
        items: any;
    }[]>;
    private actionButtonElement;
    private dropDownButtonElement;
    private getElement;
    protected static isLeafItem(item: SingleChoiceActionItem): boolean;
    protected isRootItem(item: SingleChoiceActionItem): boolean;
    private handleMouseEnter;
    private handleMouseLeave;
    private renderSubmenuItemComponent;
    private executeAction;
    protected executeItemClick: (e: any) => any;
    getItemToExecute: () => SingleChoiceActionItem;
    render(): JSX.Element;
}
export {};
//# sourceMappingURL=single-choice-action.d.ts.map