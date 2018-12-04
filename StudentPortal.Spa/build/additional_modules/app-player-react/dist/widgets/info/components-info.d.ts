import * as React from 'react';
import { ComponentBaseProps } from "../../common/base-component";
export declare type RenderType = new (props?: any, context?: any) => React.Component<any, any>;
export declare type ComponentInfo = ReturnType<typeof registerWidget>;
export declare let componentsInfo: {
    [key: string]: ComponentInfo;
};
export declare function getComponentInfo(type: ComponentBaseProps["type"]): {
    rendererType: any;
    loader: () => Promise<any>;
    displayingContext: string;
    customizeWidget: (widget: any) => any;
};
export declare function findComponentInfo(type: ComponentBaseProps["type"]): {
    rendererType: any;
    loader: () => Promise<any>;
    displayingContext: string;
    customizeWidget: (widget: any) => any;
};
export declare type WidgetRegistration = {
    name: string;
    customizeWidget?: (widget: any) => any;
    displayingContext?: string;
};
export declare function registerInheritWidget(widgetOptions: WidgetRegistration & {
    inherit: string;
}): {
    rendererType: any;
    loader: () => Promise<any>;
    displayingContext: string;
    customizeWidget: (widget: any) => any;
};
export declare function registerWidget(widgetOptions: WidgetRegistration & {
    loader: () => Promise<any>;
}): {
    rendererType: any;
    loader: () => Promise<any>;
    displayingContext: string;
    customizeWidget: (widget: any) => any;
};
export declare function customizeProps(customizer: Function): (Widget: any) => (props: any) => JSX.Element;
//# sourceMappingURL=components-info.d.ts.map