import * as React from "react";
import { ReactPopupConfig } from "../widgets/popup-widget";
export declare type PopupSettingsProvider = {
    type?: string;
    popupSettings?: ReactPopupConfig;
};
export declare function withPopup<P extends object>(Component: React.ComponentType<P>): React.StatelessComponent<P & PopupSettingsProvider>;
//# sourceMappingURL=with-popup.d.ts.map