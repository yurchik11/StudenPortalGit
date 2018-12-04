import { IParameter } from "../app-config";
export interface IRefreshStrategy {
    enabled: boolean;
    refresh(): any;
    dispose(): any;
}
export declare class DataSourceRefreshStrategy implements IRefreshStrategy {
    dataSource: dxdata.DataSource;
    static create(dataSource: dxdata.DataSource): DataSourceRefreshStrategy;
    enabled: boolean;
    constructor(dataSource: dxdata.DataSource);
    refresh(): void;
    dispose(): void;
}
export declare class MonitorRefreshStrategy implements IRefreshStrategy {
    private dataSource;
    private stores;
    refreshFunc: Function;
    enabled: boolean;
    modified: boolean;
    constructor(dataSource: dxdata.DataSource, stores: dxdata.Store[]);
    refresh(): void;
    dispose(): void;
}
export declare class ParameterRefreshStrategy implements IRefreshStrategy {
    protected config: IParameter;
    protected model: any;
    protected store: dxdata.Store;
    protected key: any;
    static create(config: IParameter, model: any, store: dxdata.Store, key: any): ParameterRefreshStrategy;
    enabled: boolean;
    constructor(config: IParameter, model: any, store: dxdata.Store, key: any);
    refresh(): void;
    dispose(): void;
}
//# sourceMappingURL=refresh-strategies.d.ts.map