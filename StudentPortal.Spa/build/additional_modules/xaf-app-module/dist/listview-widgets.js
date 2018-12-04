/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import { createListView$codeFunctions } from "./collection-contexts";
import { getActionExecute } from "./actions";
import { createStateStoring } from "./grid-state-storing";
import { viewsStoreId } from "./stores";
import { baseModelProperty, detailModelProperty } from "./views";
var listViewShowObjectAction = "ListViewShowObject";
function collectionWidgetOptions(config) {
    var _a = config, dataSource = _a.dataSource, restWidgetOptions = tslib_1.__rest(_a, ["dataSource"]);
    return tslib_1.__assign({ dataSource: getCollectionDataSource({ dataSource: dataSource }) }, restWidgetOptions
    // NOTE Dont bind to selectedItems. Changing selectedItems way to call setState and after that all list items re-rendered. 
    // TODO Try to use defaultSelectedItems for set selection from server
    // selectedItems: `$local.${listModelProperty.selectedItems}`
    );
}
function getCollectionDataSource(options) {
    var _a, _b;
    var _c = (options.dataSource || {}).propertyName, propertyName = _c === void 0 ? null : _c;
    var dataSource = tslib_1.__assign({}, options.dataSource, (_a = { store: "$global.stores." + viewsStoreId }, _a[baseModelProperty.viewId] = "$local." + baseModelProperty.viewId, _a.getViewState = { $code: createListView$codeFunctions(propertyName).getViewState }, _a));
    if (propertyName) {
        dataSource = tslib_1.__assign({}, dataSource, (_b = {}, _b[detailModelProperty.currentObjPropName] = "$local." + detailModelProperty.currentObjPropName, _b));
    }
    return dataSource;
}
export function getListViewListWidget(_a) {
    var dataSource = _a.dataSource, restWidgetOptions = tslib_1.__rest(_a, ["dataSource"]);
    var listComponentBase = {
        "showSelectionControls": true,
        "pullRefreshEnabled": true,
    }, propertyName = dataSource && dataSource.propertyName, action = getActionExecute({ actionId: listViewShowObjectAction, propertyName: propertyName }), _$codeFunctions = createListView$codeFunctions(propertyName), result = collectionWidgetOptions(tslib_1.__assign({}, listComponentBase, { dataSource: dataSource,
        propertyName: propertyName, onInitialized: {
            "$code": _$codeFunctions.onInitialized
        }, onSelectionChanged: {
            "$code": _$codeFunctions.onListSelectionChanged
        }, onItemClick: {
            "$code": function (runContext) {
                // use new $focusedItem instead of $local.selecteItems for save current control selection
                action(tslib_1.__assign({}, runContext, { $focusedItem: runContext.$event.itemData }));
            }
        } }, restWidgetOptions, { type: "xaf-list" }));
    return result;
}
export var gridComponentDefaults = {
    hoverStateEnabled: true,
    showColumnLines: false,
    showRowLines: true,
    remoteOperations: true,
    columnChooser: {
        enabled: false
    },
    headerFilter: {
        "visible": true
    },
    filterPanel: {
        visible: true
    },
    groupPanel: {
        "visible": true
    },
    selection: {
        mode: "multiple",
        showCheckBoxesMode: "always"
    }
};
export function addSelectRowFeature(showObjectAction) {
    var _this = this;
    return {
        defaultFocusedRowIndex: 0,
        focusedRowEnabled: true,
        onContentReady: {
            "$code": function (runContext) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var grid;
                return tslib_1.__generator(this, function (_a) {
                    grid = runContext.$event.component;
                    grid.focus();
                    return [2 /*return*/];
                });
            }); }
        },
        onKeyDown: {
            "$code": function (runContext) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var grid, key, isGroup, $focusedItem;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(runContext.$event.event.code === "Enter")) return [3 /*break*/, 2];
                            grid = runContext.$event.component, key = grid.option("focusedRowKey"), isGroup = Array.isArray(key);
                            if (!!isGroup) return [3 /*break*/, 2];
                            return [4 /*yield*/, grid.byKey(key)];
                        case 1:
                            $focusedItem = _a.sent();
                            if (!($focusedItem.items && $focusedItem.key)) {
                                showObjectAction(tslib_1.__assign({}, runContext, { $focusedItem: $focusedItem }));
                            }
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            }); }
        }
    };
}
export function getListViewGridWidget(config, view) {
    var dataSource = config.dataSource, restWidgetOptions = tslib_1.__rest(config, ["dataSource"]), propertyName = dataSource && dataSource.propertyName, stateStoring = createStateStoring(restWidgetOptions, view), showObjectAction = getActionExecute({ actionId: listViewShowObjectAction, propertyName: propertyName }), selectRow = addSelectRowFeature(showObjectAction), _$codeFunctions = createListView$codeFunctions(propertyName);
    return collectionWidgetOptions(tslib_1.__assign({}, gridComponentDefaults, { propertyName: propertyName,
        dataSource: dataSource,
        stateStoring: stateStoring, onInitialized: {
            "$code": _$codeFunctions.onInitialized
        }, onSelectionChanged: {
            "$code": _$codeFunctions.onGridSelectionChanged
        }, onRowClick: {
            "$code": function (runContext) {
                if (runContext.$event.rowType !== "group") {
                    // use new $focusedItem instead of $local.selecteItems for save current control selection
                    showObjectAction(tslib_1.__assign({}, runContext, { $focusedItem: runContext.$event.data }));
                }
            }
        }, loadPanel: {
            enabled: false // for prevent displaying two load indicator on executing action
        } }, selectRow, restWidgetOptions, { type: "grid" }));
}
