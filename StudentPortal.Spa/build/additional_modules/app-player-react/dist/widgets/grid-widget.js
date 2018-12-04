/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import { Template } from "devextreme-react/core/template";
import { ColumnChooser, DataGrid, FilterPanel, FilterRow, GroupPanel, HeaderFilter, } from "devextreme-react/ui/data-grid";
import * as React from "react";
import compileEventHandlers, { createRunContextWithItem, extractWidgetEventHandlers } from "../logic/event-compiler";
import { RunContext } from "../views/run-context";
import { ItemComponents } from "./list-widget";
import { createWithStyleComponent } from "./with-style";
import { createSelector } from "reselect";
var nestedComponents = {
    columnChooser: ColumnChooser,
    headerFilter: HeaderFilter,
    filterPanel: FilterPanel,
    filterRow: FilterRow,
    groupPanel: GroupPanel
};
var WithStyle = createWithStyleComponent({
    main: {
        width: "100%",
        height: "100%",
        "& .dx-datagrid-header-panel": {
            paddingLeft: "30px",
            paddingTop: "11px"
        }
    }
});
var ReactDataGrid = /** @class */ (function (_super) {
    tslib_1.__extends(ReactDataGrid, _super);
    function ReactDataGrid() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.originalEventsSelector = createSelector([
            function (_a) {
                var _originalConfig = _a._originalConfig;
                return _originalConfig;
            },
            function (_a) {
                var runContext = _a.runContext;
                return runContext;
            }
        ], function (_originalConfig, runContext) { return compileEventHandlers(extractWidgetEventHandlers(_originalConfig), function (e) { return createRunContextWithItem(runContext, e.data); }); });
        _this.columnsSelector = createSelector([
            function (_a) {
                var columns = _a.columns;
                return columns;
            },
        ], function (columns) {
            var templateIndex = 0;
            var templates = [], defaultColumns = columns.map(function (column) {
                if (column.components) {
                    var templateName_1 = "widgetTemplate" + templateIndex++;
                    templates.push(function (runContext) { return (React.createElement(Template, { key: templateName_1, name: templateName_1, render: function (itemHolder) {
                            return (React.createElement(ItemComponents, { name: templateName_1, components: column.components, runContext: runContext, itemHolder: itemHolder.data }));
                        } })); });
                    return tslib_1.__assign({}, column, { cellTemplate: templateName_1 });
                }
                else {
                    return column;
                }
            });
            return {
                defaultColumns: defaultColumns,
                templates: function (runContext) { return templates.map(function (template) { return template(runContext); }); }
            };
        });
        return _this;
    }
    ReactDataGrid.prototype.getGridOptions = function (props) {
        var columns = props.columns, _originalConfig = props._originalConfig, runContext = props.runContext, rest = tslib_1.__rest(props, ["columns", "_originalConfig", "runContext"]), _a = this.extractNestedOptions(rest), gridOptions = _a.gridOptions, nestedOptions = _a.nestedOptions;
        return {
            gridOptions: gridOptions,
            nestedOptions: this.patchNestedOptions(nestedOptions)
        };
    };
    ReactDataGrid.prototype.extractNestedOptions = function (props) {
        var columnChooser = props.columnChooser, headerFilter = props.headerFilter, filterPanel = props.filterPanel, filterRow = props.filterRow, groupPanel = props.groupPanel, gridOptions = tslib_1.__rest(props, ["columnChooser", "headerFilter", "filterPanel", "filterRow", "groupPanel"]);
        return {
            gridOptions: gridOptions,
            nestedOptions: { columnChooser: columnChooser, headerFilter: headerFilter, filterPanel: filterPanel, filterRow: filterRow, groupPanel: groupPanel }
        };
    };
    ReactDataGrid.prototype.patchNestedOptions = function (options) {
        if (options.columnChooser) {
            this.configureColumnChooserContainer(options.columnChooser);
        }
        return options;
    };
    ReactDataGrid.prototype.configureColumnChooserContainer = function (columnChooser) {
        if (!columnChooser.container) {
            if (!this.columnChooserContainerId) {
                this.columnChooserContainerId = "dx-column-chooser-container-" + ReactDataGrid.instanceCount++;
            }
            columnChooser.container = "#" + this.columnChooserContainerId;
        }
    };
    ReactDataGrid.prototype.render = function () {
        var _this = this;
        var _a = this.getGridOptions(this.props), gridOptions = _a.gridOptions, nestedOptions = _a.nestedOptions, _b = this.columnsSelector(this.props), templates = _b.templates, defaultColumns = _b.defaultColumns;
        return (React.createElement(RunContext.Consumer, null, function (runContext) {
            if (runContext === void 0) { runContext = _this.props.runContext; }
            var originalEvents = _this.originalEventsSelector(tslib_1.__assign({}, _this.props, { runContext: runContext })), props = tslib_1.__assign({}, gridOptions, { defaultColumns: defaultColumns }, originalEvents);
            return (React.createElement(WithStyle, { className: _this.props.className }, function (_a) {
                var main = _a.main;
                return (React.createElement(DataGrid, tslib_1.__assign({}, props, { style: _this.props.style, className: main }),
                    templates(runContext),
                    _this.renderNestedComponents(nestedOptions),
                    React.createElement("div", { id: _this.columnChooserContainerId })));
            }));
        }));
    };
    ReactDataGrid.prototype.renderNestedComponents = function (nestedOptions) {
        return Object.keys(nestedOptions)
            .filter(function (key) { return nestedOptions[key]; })
            .map(function (key) { return ({ key: key, Component: nestedComponents[key], props: nestedOptions[key] }); })
            .map(function (_a) {
            var key = _a.key, Component = _a.Component, props = _a.props;
            return React.createElement(Component, tslib_1.__assign({ key: key }, props));
        });
    };
    ReactDataGrid.defaultProps = { columns: [], _originalConfig: {} };
    ReactDataGrid.instanceCount = 0;
    return ReactDataGrid;
}(React.Component));
export { ReactDataGrid };
