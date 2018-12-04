import "./info/components-registration";
import "./info/commands-registration";
import * as React from "react";
import { ComponentBaseProps } from "../common/base-component";
import { ObservablesProvider } from "../model/linked-model";
declare type Props = ComponentBaseProps & Partial<ObservablesProvider>;
declare type State = {
    prevProps: Props;
    componentProps: any;
};
export default class AppPlayerComponent<T extends {}> extends React.PureComponent<Props & T, State> {
    private subscriptions;
    static getDerivedStateFromProps(nextProps: Props, prevState: State): State;
    constructor(props: Props & T);
    render(): JSX.Element;
    componentWillUnmount(): void;
}
export declare const FlexAppPlayerComponent: (props: {
    widgetProps: any;
    orientation?: import("app-player-react/src/widgets/flex-helper").Orientation;
}) => JSX.Element;
export {};
//# sourceMappingURL=app-player-component.d.ts.map