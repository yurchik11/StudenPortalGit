import * as React from "react";
import { IRunContext } from "../../common/runtime";
import { Command } from "../info/commands-info";
import { ComponentWithStyleProps } from "../with-style";
import { ComponentBaseProps } from "../../common/base-component";
declare type AppbarProps = ComponentBaseProps & ComponentWithStyleProps & {
    items: Command[];
    runContext?: IRunContext;
};
declare type State = {};
export declare class ReactAppbar extends React.Component<AppbarProps, State> {
    render(): JSX.Element;
    private generateToolbarItems;
    private generateMenuItem;
    private generateTitleItem;
}
export {};
//# sourceMappingURL=appbar-widget.d.ts.map