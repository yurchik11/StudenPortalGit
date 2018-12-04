import { IDataStore } from "../app-config";
import { IRunContext } from "../common/runtime";
export declare class StoreFactory {
    static _resolvedCreators: {};
    static linkStoreOptions(dataStore: IDataStore, runContext: IRunContext): IDataStore & import("app-player-react/src/model/linked-model").ObservablesProvider;
    static init(configs: IDataStore[]): Promise<void>;
    static createStore(dataStore: IDataStore, stores: {
        [key: string]: dxdata.Store;
    }, runContext: IRunContext): dxdata.Store;
    private static makeKeyPropertyForArrayItems;
    private static createPredefinedStore;
}
//# sourceMappingURL=store-factory.d.ts.map