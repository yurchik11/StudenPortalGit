import { IDataGridOptions } from "devextreme-react/ui/data-grid";
import DevExpress from "devextreme/bundles/dx.all";
import * as React from "react";
import { IDataSource } from "../app-config";
import { IRunContext } from "../common/runtime";
import { FunctionCodeHolder } from "../logic/function-compiler";
import { OriginalConfigProvider } from "../model/hem-original-config";
import { ComponentWithStyleProps } from "./with-style";
interface GridColumn extends DevExpress.ui.dxDataGridColumn {
    components?: any[];
}
export declare type GridComponent = ComponentWithStyleProps & {
    columns?: GridColumn[];
    onRowClick?: FunctionCodeHolder;
    dataSource?: string | Array<any> | IDataSource;
} & IDataGridOptions;
declare type GridProps = GridComponent & {
    runContext?: IRunContext;
} & Partial<OriginalConfigProvider>;
export declare class ReactDataGrid extends React.Component<GridProps, {}> {
    static defaultProps: GridProps;
    private static instanceCount;
    private originalEventsSelector;
    private getGridOptions;
    private columnsSelector;
    private extractNestedOptions;
    private patchNestedOptions;
    private columnChooserContainerId;
    private configureColumnChooserContainer;
    render(): JSX.Element;
    private renderNestedComponents;
}
export {};
//# sourceMappingURL=grid-widget.d.ts.map