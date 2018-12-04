import { JQueryAjaxSettings } from "../utils/jquery.stub";
import { IRequestEntry } from "../app-config";
import { IDataError } from "../common/runtime";
export declare function setHeaders(headers: IRequestEntry[], request: JQueryAjaxSettings): void;
export declare function getDataErrorMessage(statusText: string, errorThrown: string): string;
export declare function getDataError(settings: JQueryAjaxSettings, xhr: XMLHttpRequest, statusText: string, errorThrown: string): IDataError;
export declare function correctODataError(error: IDataError): IDataError;
export declare function getProxyUrl(): any;
export declare function proxyRequest(useProxy: boolean, request: JQueryAjaxSettings): void;
export declare function getOriginalUrl(request: JQueryAjaxSettings): any;
export declare function ajax(settings: JQueryAjaxSettings): any;
export declare function convertData(xhr: XMLHttpRequest, dataType: string): any;
export declare function computedFilter(filterFunc: (item: any) => any, callback: Function): (item: any) => any;
export declare class DataStoreDiag {
    private requests;
    currentTag: string;
    getRequest(tag: string): JQueryAjaxSettings;
    setRequest(tag: string, request: JQueryAjaxSettings): void;
    clear(): void;
}
//# sourceMappingURL=utils.d.ts.map