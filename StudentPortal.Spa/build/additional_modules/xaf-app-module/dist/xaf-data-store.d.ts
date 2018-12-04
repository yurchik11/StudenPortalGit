import CustomStore from "devextreme/data/custom_store";
export declare type ActionParams = {
    actionId: string;
    actionParameter?: any;
    selectedObjects?: string[];
};
export declare class XafDataStore extends CustomStore {
    _customLoadOptions(): string[];
    constructor(options: any);
    private getAspNetOption;
}
export declare type ActionResponse = {
    currentObject: {};
    viewState: {
        isClosed: boolean;
        criteria: string;
        currentObject: any;
        objectsState: any;
    };
    newViewState?: {
        viewId: string;
        currentObject: any;
    };
};
export declare type ExtraByKey = {
    byKey(key: any, extra: any): Promise<any>;
};
export declare class XafModelActionStore extends CustomStore implements ExtraByKey {
    _customLoadOptions(): string[];
    constructor(options: any);
    private processResponse;
    protected _execRequest(url: string, postData: {
        currentObject: any;
        criteria: any;
        objectsState: any;
        loadOptions: {};
    }): any;
}
export declare function createDataStore(options: any): XafDataStore;
export declare function createModelActionStore(options: any): XafModelActionStore;
//# sourceMappingURL=xaf-data-store.d.ts.map