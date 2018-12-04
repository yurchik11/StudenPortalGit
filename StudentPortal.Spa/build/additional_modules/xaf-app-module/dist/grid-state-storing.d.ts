import { GridComponent } from "app-player-react/dist/widgets/grid-widget";
export declare type viewParameterType = {
    id: string;
};
export declare function createStateStoring(config: GridComponent, view: viewParameterType): {
    enabled?: boolean;
    storageKey?: string;
    type?: "custom" | "localStorage" | "sessionStorage";
    customLoad?: () => Promise<any> | JQueryPromise<any>;
    customSave?: (gridState: any) => any;
    savingTimeout?: number;
};
//# sourceMappingURL=grid-state-storing.d.ts.map