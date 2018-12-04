import dxArrayStore from "devextreme/data/array_store";
export default class ArrayStore extends dxArrayStore {
    constructor(storeOptions: dxdata.ArrayStoreOptions);
    byKey(key: any): Promise<any>;
    load(loadOptions?: dxdata.LoadOptions): Promise<any> & JQueryPromise<any>;
}
//# sourceMappingURL=array-store.d.ts.map