import { ComponentBaseProps } from "../common/base-component";
import * as React from "react";
import { IRunContext } from "../common/runtime";
import { ObservablesProvider } from "./linked-model";
export declare type ObservableComponentModelProps<C> = {
    componentConfig: C;
    runContext?: IRunContext;
    children: (componentModel: ComponentModel<C>) => React.ReactNode;
};
export declare type ComponentModel<C> = C & ObservablesProvider;
export declare function createObservableConfig<T>({ componentConfig, runContext }: {
    componentConfig: T;
    runContext: any;
}): {
    componentModel: T;
};
export default class ObservableComponentModel<C extends ComponentBaseProps> extends React.Component<ObservableComponentModelProps<C>, {
    componentModel?: ComponentModel<C>;
}> {
    static getDerivedStateFromProps(props: any, prevState: any): any;
    constructor(props: ObservableComponentModelProps<C>);
    render(): React.ReactNode;
}
//# sourceMappingURL=observable-component-model.d.ts.map