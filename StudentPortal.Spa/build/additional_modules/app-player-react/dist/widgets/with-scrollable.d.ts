import * as React from "react";
import { IScrollViewOptions } from "devextreme-react/ui/scroll-view";
declare type ScrollableProvider = {
    scrollable?: IScrollViewOptions;
};
export declare const defaults: IScrollViewOptions;
export declare function withScrollable<P extends object>(Component: React.ComponentType<P>): React.StatelessComponent<P & ScrollableProvider>;
export {};
//# sourceMappingURL=with-scrollable.d.ts.map