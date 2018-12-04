import { IDataStore } from "../app-config";
import { IRunContext } from "../common/runtime";
export interface IStoreApi {
    load(storeId: string, options?: dxdata.LoadOptions): Promise<any>;
    byKey(storeId: string, key: any, extraOptions?: {
        expand?: string[];
    }): Promise<any>;
    keyOf(storeId: string, object: any): Promise<any>;
    save(storeId: string, object: any, key?: any): Promise<any>;
    remove(storeId: string, objectOrKey: any): Promise<any>;
}
export declare type IStores = {
    [key: string]: dxdata.Store;
};
export declare function createStoreApi(stores: IStores): IStoreApi;
export declare function createStores(configs: IDataStore[], runContext: IRunContext): Promise<IStores>;
//# sourceMappingURL=create-stores.d.ts.map