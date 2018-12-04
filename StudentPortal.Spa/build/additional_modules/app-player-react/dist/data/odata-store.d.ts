import dxODataStore from "devextreme/data/odata/store";
import { IODataStore } from "../app-config";
import { IRunContext } from "../common/runtime";
import { DataStoreDiag } from "./utils";
export default class ODataStore extends dxODataStore {
    private storeOptions;
    private stores;
    private static compileUrl;
    private static createODataStoreOptions;
    constructor(storeOptions: IODataStore, stores: {
        [key: string]: dxdata.Store;
    }, runContext?: IRunContext, diag?: DataStoreDiag);
    load(loadOptions?: dxdata.LoadOptions): Promise<any> & JQueryPromise<any>;
    byKey(key: any): Promise<any>;
    insert(values: any): Promise<any> & JQueryPromise<any>;
    update(key: any, values: any): Promise<any> & JQueryPromise<any>;
    remove(key: any): Promise<void> & JQueryPromise<void>;
    totalCount(loadOptions: dxdata.LoadOptions): Promise<number> & JQueryPromise<number>;
}
//# sourceMappingURL=odata-store.d.ts.map