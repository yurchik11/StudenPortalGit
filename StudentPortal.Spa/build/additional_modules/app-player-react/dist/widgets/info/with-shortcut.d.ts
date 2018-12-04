/// <reference types="react" />
declare type WithShortcutProps = {
    shortcut: string;
    onExecute: Function;
};
export declare function withShortcut(Widget: any): (props: WithShortcutProps) => JSX.Element;
export {};
//# sourceMappingURL=with-shortcut.d.ts.map