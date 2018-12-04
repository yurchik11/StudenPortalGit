import "../css/app.css";
import "./widgets/info/components-default-style-registration";
import * as React from "react";
import { IAppConfig } from "./app-config";
import { AppState } from "./app-state";
import { DisplayedViewInfo } from "./views/displayed-views-info-producer";
declare type AppProps = {
    appConfig?: IAppConfig;
    appConfigSource?: (device?: string) => IAppConfig;
    cachedViewsInfo: {
        [key: string]: DisplayedViewInfo;
    };
};
export declare class App extends React.Component<AppProps, AppState> {
    constructor(props: any);
    render(): JSX.Element;
}
export {};
//# sourceMappingURL=app.d.ts.map