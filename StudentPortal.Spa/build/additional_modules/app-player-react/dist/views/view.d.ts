import * as React from "react";
import { IView } from "../app-config";
import { ComponentBaseProps } from "../common/base-component";
import { IRunContext } from "../common/runtime";
export declare type DisplayViewInfo = {
    id: string;
    title?: string;
};
export declare class View extends React.PureComponent<{
    viewConfig: IView & ComponentBaseProps;
    runContext: IRunContext;
}, {}> {
    render(): JSX.Element;
}
//# sourceMappingURL=view.d.ts.map