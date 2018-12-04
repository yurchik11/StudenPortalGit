import { IView } from "../app-config";
import { RoutingPart } from "./routing-parts";
export interface IRoutingPartWithPane extends RoutingPart {
    pane: string;
}
export declare function getViewById(views: {
    id: string;
}[]): (viewId: string) => IView;
export declare function getRoutingPartsWithPane(routingParts: RoutingPart[], availablePanes: string[]): {
    pane: string;
    viewId: string;
    params?: {
        [key: string]: any;
    };
    config?: IView;
    equals(IRoutingPart: any): boolean;
}[];
//# sourceMappingURL=routing-pane-services.d.ts.map