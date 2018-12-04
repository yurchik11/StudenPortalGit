export declare const baseModelProperty: {
    viewId: string;
    viewState: string;
};
export declare const listModelProperty: {
    selectedItems: string;
    selectionSourceWidget: string;
};
export declare const detailModelProperty: {
    currentObjPropName: string;
    collectionContextsPropName: string;
};
export declare enum viewTypes {
    detailView = "detailView",
    listView = "listView"
}
export declare const patchComponents: (deviceType: any) => <T extends {
    id: string;
}>(view: T) => T;
export declare const patchConfig: (deviceType: any) => <T extends {
    id: string;
}>(config: T) => T;
export declare const patchImmediatePostData: (imediatePostDataProperties: string[]) => (config: any) => any;
export declare const patchView: (deviceType: any) => <T extends {
    id: string;
}>(config: T & {
    type: viewTypes;
    imediatePostDataProperties?: string[];
}) => T;
//# sourceMappingURL=views.d.ts.map