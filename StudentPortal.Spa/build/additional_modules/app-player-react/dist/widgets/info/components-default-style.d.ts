/// <reference types="react" />
import { ThemeScopes } from "../theme-scope";
declare type Options = {
    type: string;
    scope?: ThemeScopes | ThemeScopes[];
    inherit?: {
        type: string;
        scope?: ThemeScopes;
    };
    styles?: React.CSSProperties;
};
export declare const componentDefaultStyles: {};
export declare function getDefaultStyle(type: string, scope?: ThemeScopes): any;
export declare function getScopedName(type: string, scope?: ThemeScopes): string;
export declare function registerDefaultStyles(options: Options): void;
export {};
//# sourceMappingURL=components-default-style.d.ts.map