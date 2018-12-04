import * as React from "react";
export declare const ShortcutsScope: React.Context<string>;
export declare function pushScope(value: string): void;
export declare function popScope(): void;
export declare function getRootScope(): any;
export declare function setRootScope(value: string): void;
export declare function bind(key: string, scope: string, handler: any): void;
export declare function unbind(key: string, scope: string): void;
//# sourceMappingURL=shortcuts.d.ts.map