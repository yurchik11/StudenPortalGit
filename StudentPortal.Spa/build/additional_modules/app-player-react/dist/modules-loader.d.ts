import { IModuleImports, IAppConfig } from "./app-config";
export declare type ImportedModule = {
    createModule({ appConfig }: any): Promise<any>;
    functions?: {
        id: string;
        func: (...args: any[]) => any;
    }[];
};
export declare class ModulesLoader {
    alreadyLoadedModules: string[];
    private _loadingModuleManager;
    _appConfig: IAppConfig;
    _functions: any;
    _modules: {
        [key: string]: (() => Promise<ImportedModule> | ImportedModule);
    };
    private _initModule;
    constructor({ modules, appConfig, functions }: {
        modules: {
            [key: string]: (() => Promise<ImportedModule> | ImportedModule);
        };
        appConfig: IAppConfig;
        functions: any;
    });
    findModulesToLoad(config?: any): any[];
    initModules(modulesConfig: IModuleImports): Promise<void>;
    getModulesToInit(modulesConfig: IModuleImports): (string | import("app-player-react/src/app-config").IModuleImport)[];
}
//# sourceMappingURL=modules-loader.d.ts.map