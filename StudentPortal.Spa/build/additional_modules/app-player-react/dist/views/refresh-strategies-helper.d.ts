import { IView } from "../app-config";
import { IRefreshStrategy } from "../model/refresh-strategies";
export declare class RefreshStrategiesHelper {
    static createRefreshStrategies(model: any, viewConfig: IView, stores: {
        [key: string]: dxdata.Store;
    }, navigationParameters?: {
        [name: string]: any;
    }): IRefreshStrategy[];
    static processRefreshStrategies(refreshStrategies: IRefreshStrategy[], enabled: boolean): void;
    static disposeRefreshStrategies(refreshStrategies: IRefreshStrategy[]): void;
}
//# sourceMappingURL=refresh-strategies-helper.d.ts.map