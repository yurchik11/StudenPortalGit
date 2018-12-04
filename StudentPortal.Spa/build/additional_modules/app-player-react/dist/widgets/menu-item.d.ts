/// <reference types="react" />
declare type Item = {
    icon?: string;
    text?: string;
    showArrow?: boolean;
    onExecute?: (e: any) => any;
};
export declare function MenuItemTemplate(item: Item): JSX.Element;
export declare function StandaloneMenuItemTemplate(item: Item): JSX.Element;
export {};
//# sourceMappingURL=menu-item.d.ts.map