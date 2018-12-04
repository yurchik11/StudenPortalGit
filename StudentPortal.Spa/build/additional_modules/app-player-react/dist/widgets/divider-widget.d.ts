import { ComponentWithStyleProps } from "./with-style";
import * as React from "react";
import { OriginalConfigProvider } from "../model/hem-original-config";
import { ComponentBaseProps } from "../common/base-component";
export declare type DividerProps = ComponentBaseProps & ComponentWithStyleProps & Partial<OriginalConfigProvider>;
export default class ReactDivider extends React.Component<DividerProps, {}> {
    render(): JSX.Element;
}
//# sourceMappingURL=divider-widget.d.ts.map