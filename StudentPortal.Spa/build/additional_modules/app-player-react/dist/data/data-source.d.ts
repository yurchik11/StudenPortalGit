import dxDataSource from "devextreme/data/data_source";
import { IDataSource } from "../app-config";
import { IRunContext } from "../common/runtime";
import { ModelServices } from "../model/model";
export default class DataSource {
    static createLinkedConfig(config: IDataSource, runContext: IRunContext): IDataSource & import("app-player-react/src/model/linked-model").ObservablesProvider;
    static createDataSource(config: IDataSource, runContext: IRunContext, stores: {
        [key: string]: dxdata.Store;
    }, services: ModelServices): dxDataSource;
    private static initDataObservables;
}
//# sourceMappingURL=data-source.d.ts.map