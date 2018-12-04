import { ComponentBaseProps } from "../common/base-component";
import * as React from "react";
export declare function normalizeStyle(style?: {}): any;
declare type State = {
    propsStyle?: any;
    style: any;
};
export declare class NormalizeStyle<P extends ComponentBaseProps & {
    children: (props: P) => React.ReactChild;
}> extends React.Component<P, State> {
    state: State;
    static getDerivedStateFromProps(props: any, state: State): Partial<State>;
    render(): any;
}
export {};
//# sourceMappingURL=normalize-style-hoc.d.ts.map