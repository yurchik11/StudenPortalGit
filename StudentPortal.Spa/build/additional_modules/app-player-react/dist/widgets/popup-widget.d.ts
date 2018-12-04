import { ComponentBaseProps } from "../common/base-component";
import { IPopupOptions } from "devextreme-react/ui/popup";
import * as React from "react";
import { ComponentWithStyleProps } from "./with-style";
export declare type ReactPopupConfig = ComponentBaseProps & IPopupOptions & ComponentWithStyleProps & {
    children?: (toggleDisplayedFn: () => Promise<void>) => React.ReactNode;
};
declare type ReactPopupState = {};
export default class ReactPopup extends React.Component<ReactPopupConfig, ReactPopupState> {
    private popup;
    toggleDisplayedFn: () => any;
    render(): JSX.Element;
}
export {};
//# sourceMappingURL=popup-widget.d.ts.map