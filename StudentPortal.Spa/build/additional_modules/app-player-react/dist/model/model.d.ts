/// <reference types="knockout" />
import { IDataSource, IModel, IModelProperty, IParameter } from "../app-config";
import { IRunContext } from "../common/runtime";
import { TypeInfoRepository } from "../logic/types";
import { IModelStorage } from "./model-storage";
export interface ModelServices {
    modelStorage: IModelStorage;
    typeInfoRepository: TypeInfoRepository;
}
export interface IValueDescriptor {
    name: string;
    observable?: KnockoutObservable<any>;
}
interface ISelectorsOptions {
    onObservableCreated?: (descriptor: IValueDescriptor) => void;
    observableSelectors: string[];
}
interface IDescriptorOptions extends ISelectorsOptions {
    initialValue: any;
    name: string;
}
export interface IModelPropertyDescriptorPair {
    valueDescriptor?: IValueDescriptor;
    propertyDescriptor?: PropertyDescriptor;
    modelProperty: IParameter | IModelProperty;
    computed?: KnockoutComputed<any>;
}
export default class Model {
    static onCustomizeProperties: (descriptors: IModelPropertyDescriptorPair[]) => void;
    static createGlobalModel(config: IModel, services: ModelServices, runContext?: IRunContext): any;
    static createLocalModel(config: IModel, services: ModelServices, runContext: IRunContext, onCreatingModel?: (descriptors: IModelPropertyDescriptorPair[]) => void): any;
    static createModel(config: IModel, services: ModelServices, runContext: IRunContext, callerPrefix: string, model: any, onCustomizeProperties?: (descriptors: IModelPropertyDescriptorPair[]) => void): any;
    private static getCustomizeProperties;
    private static createPropertyDescriptor;
    private static isCalculatedModelProperty;
    private static isFunction;
    private static createPlainPropertyDescriptor;
    private static createCalculatedPropertyDescriptor;
    private static createFunctionPropertyDescriptor;
    private static getObservableSetter;
    private static processArrayMethodArguments;
    private static setObservableProperties;
    private static processArray;
    static getDescriptor(options: IDescriptorOptions): PropertyDescriptor;
    static _shouldObserve(options: {
        name: string;
        observableSelectors: string[];
    }): boolean;
    private static getObservableDescriptor;
    static Traps: any[];
    private static defaultBeforeAddSubscription;
    private static getPlainDescriptor;
    static initializeDataSources(model: {}, runContext: IRunContext, services: ModelServices, stores: {
        [key: string]: dxdata.Store;
    }, dataSourceConfigs?: IDataSource[]): void;
}
export {};
//# sourceMappingURL=model.d.ts.map