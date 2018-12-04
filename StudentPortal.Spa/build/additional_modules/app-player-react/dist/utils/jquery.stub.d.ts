interface JQueryStub {
    Deferred(...args: any[]): any;
    parseXML(object: any): any;
    ajax(...args: any[]): any;
}
export interface JQueryAjaxSettings {
    url: any;
    dataType: any;
    headers: any;
}
declare const JQuery: JQueryStub;
export default JQuery;
//# sourceMappingURL=jquery.stub.d.ts.map