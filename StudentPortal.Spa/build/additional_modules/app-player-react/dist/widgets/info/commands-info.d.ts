import { WidgetRegistration } from "./components-info";
export declare type Command = {
    id: string;
    type: string;
    onExecute?: any;
    disabled?: boolean;
    visible?: boolean;
    text?: string;
    icon?: string;
    locateInMenuOptions?: {
        icon?: string;
        text?: string;
    };
    locateInMenu?: "always" | "auto" | "never";
    showText?: "always" | "inMenu";
    location?: "after" | "before" | "center";
    shortcut?: string;
    template?: string;
    menuItemTemplate?: string;
};
declare type CommandsRegistrationInfo = {
    widgetName?: string;
    displayingContext?: "popup" | "value-toolbar" | "toolbar";
    loader?: () => Promise<any>;
} & Pick<WidgetRegistration, Exclude<keyof WidgetRegistration, "loader">>;
export declare function registerCommand(commandOptions: CommandsRegistrationInfo): void;
export {};
//# sourceMappingURL=commands-info.d.ts.map