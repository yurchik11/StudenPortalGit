export interface IModelStorage {
    put(modelId: string, id: string, val: any): any;
    get(modelId: string, id: string): any;
    getKey(modelId: string, id: string): any;
    removeAll(): any;
}
export declare class ModelStorage implements IModelStorage {
    private applicationId;
    constructor(applicationId?: string);
    put(modelId: string, id: string, val: any): void;
    get(modelId: string, id: string): any;
    getKey(modelId: string, id: string): string;
    removeAll(): void;
}
//# sourceMappingURL=model-storage.d.ts.map