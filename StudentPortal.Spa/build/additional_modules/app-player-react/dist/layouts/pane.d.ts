import * as React from "react";
import { IPaneModel } from "./desktop-layout-view-model";
declare type PaneProps = {
    paneViewModel: IPaneModel;
    style?: {
        [key: string]: any;
    };
    classes?: string;
};
export declare class Pane extends React.Component<PaneProps, {}> {
    render(): JSX.Element;
}
export {};
//# sourceMappingURL=pane.d.ts.map