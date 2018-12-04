import { History } from "history";
import * as React from "react";
import { IAppConfig } from "../app-config";
import { IRunContext } from "../common/runtime";
import { ModelServices } from "../model/model";
import { IServices } from "../services";
import { RoutingPart } from "./routing-parts";
declare type RouterProps = {
    appConfig: IAppConfig;
    runContext: IRunContext;
    history?: History;
    children: (routingParts: RoutingPart[]) => React.ReactNode;
    parametersProcessor: IServices["parametersProcessor"];
    stores: any;
} & ModelServices;
interface IRouterState {
    history: History;
    runContext: IRunContext;
}
export declare class AppPlayerRouter extends React.PureComponent<RouterProps, IRouterState> {
    constructor(props: any);
    render(): JSX.Element;
}
declare type RedirectorProps = {
    routingParts: RoutingPart[];
    runContext: IRunContext;
    children: (routingParts: RoutingPart[]) => React.ReactNode;
};
export declare class Redirector extends React.Component<RedirectorProps, any> {
    valid: boolean;
    constructor(props: any);
    shouldComponentUpdate(nextProps: RedirectorProps): boolean;
    render(): {};
    componentDidMount(): void;
    private validate;
}
export {};
//# sourceMappingURL=router.d.ts.map