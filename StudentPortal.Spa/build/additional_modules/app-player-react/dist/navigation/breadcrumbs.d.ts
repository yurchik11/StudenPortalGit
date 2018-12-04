import { IRunContext } from "../common/runtime";
import { ObservablesHolder } from "../model/linked-model";
import { DisplayedViewInfo } from "../views/displayed-views-info-producer";
export declare type Breadcrumb = {
    value: string;
    observable?: ObservablesHolder;
};
export declare function getBreadcrumbs(displayedViewsInfo: DisplayedViewInfo[], availablePanes: string[], runContext?: IRunContext): {
    [key: string]: Breadcrumb[];
};
//# sourceMappingURL=breadcrumbs.d.ts.map