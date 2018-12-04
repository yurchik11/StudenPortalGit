import * as React from "react";
import { ComponentBaseProps } from "../../common/base-component";
import { ComponentWithStyleProps } from "../../widgets/with-style";
declare type NavigationHeaderTitle = ComponentBaseProps & ComponentWithStyleProps & {
    title: string;
    style?: React.CSSProperties;
};
export declare const NavigationHeaderTitle: (props: NavigationHeaderTitle) => JSX.Element;
export {};
//# sourceMappingURL=navigation-menu-header-title.d.ts.map