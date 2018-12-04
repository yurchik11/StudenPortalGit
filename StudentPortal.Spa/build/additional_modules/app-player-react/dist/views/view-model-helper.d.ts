import { IView } from "../app-config";
import { IRunContext } from "../common/runtime";
import { ModelServices } from "../model/model";
import { ParametersProcessor } from "../navigation/router-api";
import { DisplayedViewInfo } from "./displayed-views-info-producer";
export declare class ViewModelHelper {
    static createModel(viewConfig: IView, services: ModelServices, runContext: IRunContext, stores: {
        [key: string]: dxdata.Store;
    }): any;
    static loadParameters(viewInfo: DisplayedViewInfo, globalRunContext: IRunContext, parameterProcessor: ParametersProcessor, paramNames?: string[]): Promise<void>;
    static clearModel(displayedViewInfo: DisplayedViewInfo, services: ModelServices, runContext: IRunContext): void;
}
//# sourceMappingURL=view-model-helper.d.ts.map