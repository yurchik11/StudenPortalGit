import * as React from "react";
import { ComponentWithStyleProps } from "./with-style";
import { ComponentBaseProps } from "../common/base-component";
export declare type StackPanelProps = ComponentBaseProps & ComponentWithStyleProps & {
    orientation?: "vertical" | "horizontal";
    verticalAlign?: "top" | "middle" | "bottom";
    horizontalAlign?: "left" | "center" | "right";
    scrollable?: boolean;
    components?: ComponentBaseProps[];
};
export declare class ReactStackPanel extends React.Component<StackPanelProps, {}> {
    static defaultProps: StackPanelProps;
    private styleSelector;
    render(): JSX.Element;
    private renderChildren;
}
//# sourceMappingURL=stack-panel-widget.d.ts.map