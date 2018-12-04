import * as React from "react";
import { AnyIndexer } from "../app-config";
import { ComponentBaseProps } from "../common/base-component";
import { IRunContext } from "../common/runtime";
import { ComponentModel } from "../model/observable-component-model";
export declare class ViewComponent extends React.Component<{
    config: ComponentBaseProps & AnyIndexer;
    runContext: IRunContext;
    children: (componentModel: ComponentModel<ComponentBaseProps> & AnyIndexer) => React.ReactChild;
}, {}> {
    render(): JSX.Element;
}
//# sourceMappingURL=view-component.d.ts.map