import * as React from "react";
import { ComponentWithStyleProps } from "./with-style";
export declare type ThemeProvider = {
    themeScope?: string;
};
export declare function withTheme<P extends ComponentWithStyleProps>(Component: React.ComponentType<P>): React.StatelessComponent<P & ThemeProvider>;
//# sourceMappingURL=with-theme.d.ts.map