import * as React from "react";
import { DisplayedViewInfo } from "./views/displayed-views-info-producer";
export declare type AppState = {
    displayedViewsInfo: DisplayedViewInfo[];
    cachedViewsInfo: {
        [key: string]: DisplayedViewInfo;
    };
};
export declare const initialAppState: AppState;
export declare const AppStateContext: React.Context<AppState>;
//# sourceMappingURL=app-state.d.ts.map