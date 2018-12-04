import * as React from "react";
import { IAuthorization } from "../app-config";
import { RoutingPart } from "../navigation/routing-parts";
interface IAuthorizationProps {
    config?: IAuthorization;
    routingParts: RoutingPart[];
    authenticated: boolean;
}
export declare class Authorization extends React.PureComponent<IAuthorizationProps, never> {
    render(): {};
    private areNotRequireAuthentication;
    private isNotRequireAuthentication;
    private isLoginView;
    private isAllowAnonimous;
    private generateLoginUrl;
}
export {};
//# sourceMappingURL=authorization.d.ts.map