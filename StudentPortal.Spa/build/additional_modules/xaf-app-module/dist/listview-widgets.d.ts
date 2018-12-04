import { viewParameterType } from "./grid-state-storing";
export declare function getListViewListWidget({ dataSource, ...restWidgetOptions }: any): any;
export declare const gridComponentDefaults: {
    hoverStateEnabled: boolean;
    showColumnLines: boolean;
    showRowLines: boolean;
    remoteOperations: boolean;
    columnChooser: {
        enabled: boolean;
    };
    headerFilter: {
        "visible": boolean;
    };
    filterPanel: {
        visible: boolean;
    };
    groupPanel: {
        "visible": boolean;
    };
    selection: {
        mode: string;
        showCheckBoxesMode: string;
    };
};
export declare function addSelectRowFeature(showObjectAction: any): {
    defaultFocusedRowIndex: number;
    focusedRowEnabled: boolean;
    onContentReady: {
        "$code": (runContext: any) => Promise<void>;
    };
    onKeyDown: {
        "$code": (runContext: any) => Promise<void>;
    };
};
declare type anyIndex = {
    [key: string]: any;
};
export declare function getListViewGridWidget(config: {
    dataSource: {
        propertyName?: string;
    } & anyIndex;
} & anyIndex, view: viewParameterType): {
    type: string;
    defaultFocusedRowIndex: number;
    focusedRowEnabled: boolean;
    onContentReady: {
        "$code": (runContext: any) => Promise<void>;
    };
    onKeyDown: {
        "$code": (runContext: any) => Promise<void>;
    };
    propertyName: string;
    dataSource: {
        propertyName?: string;
    } & anyIndex;
    stateStoring: {
        enabled?: boolean;
        storageKey?: string;
        type?: "custom" | "localStorage" | "sessionStorage";
        customLoad?: () => Promise<any> | JQueryPromise<any>;
        customSave?: (gridState: any) => any;
        savingTimeout?: number;
    };
    onInitialized: {
        "$code": ({ $local, $event }: {
            $local: any;
            $event: any;
        }) => void;
    };
    onSelectionChanged: {
        "$code": ({ $local, $event }: {
            $local: any;
            $event: any;
        }) => void;
    };
    onRowClick: {
        "$code": (runContext: any) => void;
    };
    loadPanel: {
        enabled: boolean;
    };
    hoverStateEnabled: boolean;
    showColumnLines: boolean;
    showRowLines: boolean;
    remoteOperations: boolean;
    columnChooser: {
        enabled: boolean;
    };
    headerFilter: {
        "visible": boolean;
    };
    filterPanel: {
        visible: boolean;
    };
    groupPanel: {
        "visible": boolean;
    };
    selection: {
        mode: string;
        showCheckBoxesMode: string;
    };
};
export {};
//# sourceMappingURL=listview-widgets.d.ts.map