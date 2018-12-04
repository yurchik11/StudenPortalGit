import CustomStore from "devextreme/data/custom_store";
import { DataStoreDiag } from "./utils";
import { IRestStoreOperation, IRestStore, IRequestEntry } from "../app-config";
import { IRunContext } from "../common/runtime";
export default class RestStore extends CustomStore {
    private _customLoadOptionsNames;
    _customLoadOptions(): any;
    static _sendRequest(requestOptions: {
        url: string;
        method: string;
        data: any;
        dataType: string;
        headers: IRequestEntry[];
    }, useProxy: boolean, diag: DataStoreDiag): any;
    private diag;
    _handlers: {
        [key: string]: (runContext: IRunContext) => any;
    };
    constructor(storeOptions: IRestStore, globalModel: any, diag?: DataStoreDiag);
    _eval(expr: string, runContext: any): any;
    _transformData(data: any, method: string): any;
    getHandler(options: {
        storeOptions: IRestStore;
        operationName: string;
        headers: IRequestEntry[];
        dataType?: string;
        runContext: any;
        defaultMethod: string;
        defaultGetAjaxData: (runContext: any) => {};
    }): any;
    _getUrl(options: IRestStoreOperation, runContext: any): any;
}
//# sourceMappingURL=rest-store.d.ts.map