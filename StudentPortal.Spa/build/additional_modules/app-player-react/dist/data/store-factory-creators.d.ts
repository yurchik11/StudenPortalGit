import { IDataStore } from "../app-config";
export declare function initStoreCreators(configs: IDataStore[]): Promise<{}>;
export declare function registerStore(type: any, creator: () => Promise<(options: any) => any>): void;
//# sourceMappingURL=store-factory-creators.d.ts.map