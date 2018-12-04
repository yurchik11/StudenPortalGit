import * as React from "react";
import { ComponentBaseProps } from "../common/base-component";
import { Orientation } from "./flex-helper";
import { ComponentWithStyleProps } from "./with-style";
export declare function withFlexStyle<T extends ComponentBaseProps & ComponentWithStyleProps>(Component: React.ComponentType<T>): (props: {
    widgetProps: T;
    orientation?: Orientation;
}) => JSX.Element;
//# sourceMappingURL=with-flex-style.d.ts.map