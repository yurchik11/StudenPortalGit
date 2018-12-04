import * as React from "react";
import * as Loadable from "react-loadable";
export declare type LoadableComponent = Loadable.LoadableComponent;
export declare function withLoadable<P>(loader: () => Promise<React.ComponentType<P>>, customizeWidget?: (widget: any) => any): (props: P & import("app-player-react/src/common/base-component").VisibleProps & import("app-player-react/src/common/base-component").DisableProps & {
    id?: string;
    type?: string;
}) => JSX.Element;
//# sourceMappingURL=with-loadable.d.ts.map