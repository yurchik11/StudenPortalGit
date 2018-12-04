import * as React from "react";
import { ReactToolbar } from "../../widgets/toolbars/toolbar-widget";
import { ThemeProvider } from "../../widgets/with-theme";
declare type PaneProvider = {
    pane: "main" | "preview";
};
export default class ToolbarWithNavigation extends React.PureComponent<ReactToolbar["props"] & ThemeProvider & PaneProvider, {}> {
    render(): JSX.Element;
}
export {};
//# sourceMappingURL=toolbar-with-navigation.d.ts.map