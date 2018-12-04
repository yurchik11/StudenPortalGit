import { AppState } from "../app-state";
import { AnyIndexer, IAppConfig } from "../app-config";
import { IStoreApi } from "../data/create-stores";
import { RouterApi } from "../navigation/router-api";
export interface IRunContext extends AnyIndexer {
    $item?: any;
    $local?: any;
    $global?: any;
    $value?: any;
    $functions?: IGlobalFunctions;
}
export interface IGlobalFunctions extends IStoreApi, RouterApi, IAuthApi {
    busy(): number;
    available(): number;
    getBusyCounter(): number;
    removeCurrentViewCache(): void;
    log(level: string, message: string): void;
    getCookie(params: {
        cookieName: string;
    }): Promise<string>;
    updateAppConfig(appConfigDiff: Partial<IAppConfig>): void;
    updateAppState(appState: Partial<AppState>): void;
}
export interface IAuthApi {
    login(): any;
    logout(): any;
}
export interface IDataError extends Error {
    statusText?: string;
    httpStatus?: number;
    initiatorId?: string;
    response?: any;
}
//# sourceMappingURL=runtime.d.ts.map