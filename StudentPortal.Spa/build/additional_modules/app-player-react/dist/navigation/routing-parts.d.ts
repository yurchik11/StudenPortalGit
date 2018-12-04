import { IView } from "../app-config";
export declare type PathPart = {
    viewId: string;
    params?: {
        [key: string]: any;
    };
};
export declare type RoutingPart = {
    viewId: string;
    params?: {
        [key: string]: any;
    };
    config?: IView;
    equals(IRoutingPart: any): boolean;
};
export declare function getRoutingPartIdentifier(routingPart: RoutingPart): string;
export declare function createRoutingPart({ viewId, params }: PathPart, views: IView[]): RoutingPart;
export declare class Path {
    static parse(path: string): PathPart[];
    static stringify(viewId: string, params?: {
        [key: string]: any;
    }): string;
}
//# sourceMappingURL=routing-parts.d.ts.map