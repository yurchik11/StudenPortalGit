import { IListOptions } from "devextreme-react/ui/list";
import * as React from "react";
import { IRunContext } from "../common/runtime";
import { OriginalConfigProvider } from "../model/hem-original-config";
import { ComponentWithStyleProps } from "./with-style";
import { ComponentBaseProps } from "../common/base-component";
import { FunctionCodeHolder } from "../logic/function-compiler";
export declare type ListComponent = ComponentBaseProps & ComponentWithStyleProps & IListOptions & {
    dataSource: string;
    onItemClick?: FunctionCodeHolder;
    itemComponents?: ComponentBaseProps[];
    groupComponents?: ComponentBaseProps[];
    editConfig?: {
        allowItemDeleting?: boolean;
        itemTemplate?: string;
    };
};
export declare type ListProps = ListComponent & {
    runContext?: IRunContext;
} & OriginalConfigProvider;
export declare class ReactList extends React.Component<ListProps, {}> {
    static defaultProps: {
        editConfig: {};
    };
    private listRef;
    private originalEventsSelector;
    render(): JSX.Element;
}
export declare type ItemComponentsProps = {
    name: string;
    runContext: IRunContext;
    itemHolder: any;
    components: any[];
};
export declare class ItemComponents extends React.PureComponent<ItemComponentsProps, never> {
    static render(props: ItemComponentsProps): JSX.Element;
    render(): JSX.Element;
}
export declare class ListGroupItem extends React.Component<ItemComponentsProps, never> {
    shouldComponentUpdate(nextProps: ItemComponentsProps): boolean;
    render(): JSX.Element;
}
//# sourceMappingURL=list-widget.d.ts.map