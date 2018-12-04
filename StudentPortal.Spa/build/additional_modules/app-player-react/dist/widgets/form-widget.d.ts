import * as React from "react";
import { DeviceValue } from "../utils/device";
import { ComponentWithStyleProps } from "./with-style";
export interface IFormItem {
    itemType?: string;
    title: string;
    visible?: boolean;
}
export interface IFormItemSimple extends IFormItem {
    itemType?: "simple";
    title: string;
    type?: string;
    tabIndex?: number;
}
export interface IFormItemGroup extends IFormItem {
    itemType: "group";
    items: IFormItems;
}
export interface IFormItemTabbed extends IFormItem {
    itemType: "tabbed";
    tabs: IFormItems;
}
export declare type IFormItems = (IFormItemTabbed | IFormItemSimple | IFormItemGroup)[];
export interface IFormConfig extends ComponentWithStyleProps {
    colCount?: DeviceValue<number>;
    labelLocation?: DeviceValue<"top" | "left" | "right">;
    items: IFormItems;
}
declare type State = IFormConfig & {
    colCount: number;
    labelLocation: "top" | "left" | "right";
    originalItems: {};
};
export declare class ReactForm extends React.Component<IFormConfig, State> {
    static defaultProps: {
        items: any[];
    };
    render(): JSX.Element;
    private static componentTemplate;
    private itemsSelector;
    private colCountSelector;
    private labelLocationSelector;
    private static mapItems;
}
export {};
//# sourceMappingURL=form-widget.d.ts.map