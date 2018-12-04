import * as React from "react";
import { ComponentBaseProps } from "../common/base-component";
import { ComponentWithStyleProps } from "./with-style";
declare type DefaultStyles = {
    [key: string]: React.CSSProperties;
};
export declare const ComponentDefaultStyles: React.Context<DefaultStyles>;
export declare function DefaultStyleProvider<T extends DefaultStyles>(props: {
    children: any;
    defaults: T;
}): JSX.Element;
export declare function DefaultStyleConsumer(props: {
    widgetType: string;
    children: (defaultStyle: React.CSSProperties) => any;
}): JSX.Element;
export declare function withDefaultStyle<T extends ComponentBaseProps & ComponentWithStyleProps>(Component: React.ComponentType<T>, type?: string): (props: T) => JSX.Element;
export {};
//# sourceMappingURL=component-default-styles-provider.d.ts.map