import * as React from "react";
import { IStores } from "./data/create-stores";
import { TypeInfoRepository } from "./logic/types";
import { IModelStorage } from "./model/model-storage";
import { ParametersProcessor } from "./navigation/router-api";
export declare type IServices = {
    modelStorage: IModelStorage;
    typeInfoRepository: TypeInfoRepository;
    parametersProcessor: ParametersProcessor;
} & ServiceStores;
export declare type ServiceStores = {
    stores: IStores;
};
export declare const Services: React.Context<IServices>;
//# sourceMappingURL=services.d.ts.map