/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import { stateStoreId, viewsStoreId } from "./stores";
import * as traverse from "traverse";
import { getActionExecute } from "./actions";
import { getListViewGridWidget, getListViewListWidget } from "./listview-widgets";
import { continueFunc } from "app-player-react/dist/utils/index";
import { isString } from "app-player-react/dist/utils/cast";
import { getImediatePostDataPropertyGetterSetter } from "./common";
import { getCommandDefinitions } from "./command-definitions";
export var baseModelProperty = { viewId: "viewId", viewState: "viewState" };
export var listModelProperty = { selectedItems: "selectedItems", selectionSourceWidget: "selectionSourceWidget" };
export var detailModelProperty = { currentObjPropName: "currentObject", collectionContextsPropName: "collectionContexts" };
function getBaseView(_a) {
    var id = _a.id, _b = _a.model, model = _b === void 0 ? [] : _b, restConfig = tslib_1.__rest(_a, ["id", "model"]);
    return tslib_1.__assign({ id: id, model: mergeArray([
            {
                "name": baseModelProperty.viewId,
                "defaultValue": id
            }
        ], model) }, restConfig);
}
var getListView = function (deviceType) { return function (_a) {
    var id = _a.id, _b = _a.model, model = _b === void 0 ? [] : _b, _c = _a.components, components = _c === void 0 ? [] : _c, restConfig = tslib_1.__rest(_a, ["id", "model", "components"]);
    return getBaseView(tslib_1.__assign({ id: id, model: mergeArray([
            {
                name: baseModelProperty.viewState,
                "defaultValue": {}
            },
            {
                "name": listModelProperty.selectedItems,
                "defaultValue": []
            }
        ], model), components: components }, restConfig));
}; };
var viewStateParameter = {
    name: baseModelProperty.viewState,
    type: stateStoreId,
    routeParamName: detailModelProperty.currentObjPropName,
    extraParams: {
        viewId: "$local." + baseModelProperty.viewId,
        viewState: "$local." + baseModelProperty.viewState,
        currentObject: "$local." + detailModelProperty.currentObjPropName,
    },
    customProcess: function (_a) {
        var response = _a.$data, $local = _a.$local;
        // set first not observable property
        // $local[baseModelProperty.viewState] = response[baseModelProperty.viewState];
        $local[detailModelProperty.currentObjPropName] = response[detailModelProperty.currentObjPropName];
        return response[baseModelProperty.viewState];
    },
    // For new object
    defaultValue: null
};
function mergeArray(base, current, id) {
    if (id === void 0) { id = "name"; }
    if (current && current.length === 0) {
        return base;
    }
    else {
        var result_1 = base.slice();
        current.forEach(function (c) {
            var index = base.findIndex(function (b) { return b[id] === c[id]; });
            if (index !== -1) {
                result_1[index] = tslib_1.__assign({}, result_1[index], c);
            }
            else {
                result_1.push(c);
            }
        });
        return result_1;
    }
}
function getDetailView(_a) {
    var id = _a.id, _b = _a.model, model = _b === void 0 ? [] : _b, _c = _a.params, params = _c === void 0 ? [] : _c, _d = _a.imediatePostDataProperties, imediatePostDataProperties = _d === void 0 ? [] : _d, restConfig = tslib_1.__rest(_a, ["id", "model", "params", "imediatePostDataProperties"]);
    var predefinedModelProperties = [
        {
            name: "imagesHolder",
            defaultValue: {}
        },
        {
            name: detailModelProperty.currentObjPropName,
            observables: imediatePostDataProperties
        },
        {
            name: detailModelProperty.collectionContextsPropName,
            defaultValue: {}
        }
    ].concat(imediatePostDataProperties.map(function (propertyName) { return (tslib_1.__assign({ name: propertyName + "Value" }, getImediatePostDataPropertyGetterSetter(propertyName))); }));
    return getBaseView(tslib_1.__assign({ id: id, model: mergeArray(predefinedModelProperties, model), params: mergeArray([tslib_1.__assign({}, viewStateParameter)], params) }, restConfig));
}
export var viewTypes;
(function (viewTypes) {
    viewTypes["detailView"] = "detailView";
    viewTypes["listView"] = "listView";
})(viewTypes || (viewTypes = {}));
export var patchComponents = function (deviceType) {
    return function (view) {
        var result = traverse.forEach(view, function (component) {
            if (this.notLeaf) {
                if (component.type === "xaf-toolbar" || component.type === "xaf-appbar") {
                    var selectionIndependent = getCommandDefinitions(component.selectionIndependent), selectionDependent = getCommandDefinitions(component.selectionDependent), selectedItems = component.propertyName
                        ? "$local." + detailModelProperty.collectionContextsPropName + "." + component.propertyName + "." + listModelProperty.selectedItems
                        : "$local." + listModelProperty.selectedItems;
                    return tslib_1.__assign({}, component, { selectionIndependent: selectionIndependent,
                        selectionDependent: selectionDependent,
                        selectedItems: selectedItems });
                }
                if (component.type === "form") {
                    return tslib_1.__assign({ colCount: 1 }, component);
                }
                if (component.type === "xaf-list") {
                    return getListViewListWidget(component);
                }
                if (component.type === "xaf-grid") {
                    return getListViewGridWidget(component, view);
                }
                if (component.type === "xaf-lookup") {
                    var modelBinding = component.modelBinding, propertyName = component.propertyName;
                    return tslib_1.__assign({}, component, { type: "lookup", valueExpr: "this", value: modelBinding ? "$local." + modelBinding : "$local." + detailModelProperty.currentObjPropName + "." + propertyName, dataSource: {
                            store: "$global.stores." + viewsStoreId,
                            getViewState: { $code: "return $local." + baseModelProperty.viewState + ";" },
                            currentObject: "$local." + detailModelProperty.currentObjPropName,
                            viewId: "$local." + baseModelProperty.viewId,
                            propertyName: propertyName
                        } });
                }
                if (component.type === "command.xafSingleChoiceAction") {
                    return tslib_1.__assign({}, component, { type: deviceType === "mobile" ? "command.mobileSingleChoiceAction" : "command.singleChoiceAction" });
                }
            }
        });
        return result;
    };
};
export var patchConfig = function (deviceType) { return function (config) {
    config = patchComponents(deviceType)(config);
    var result = traverse.forEach(config, function (node) {
        if (this.key === "$action") {
            delete this.parent.node.$action;
            this.parent.node.$code = getActionExecute(node);
        }
        if (node && node.type) {
            var _a = node.type.split("."), type = _a[0], commandType = _a[1];
            if (type === "command") {
                if (commandType !== "button" && deviceType === "mobile") {
                    node.locateInMenu = node.locateInMenu || "always";
                }
                else {
                    node.locateInMenu = node.locateInMenu || "auto";
                }
                // TODO Beresnev: It should be like submenu in menu (should be done in next MVP);
                if (commandType === "singleChoiceAction") {
                    node.locateInMenu = "never";
                }
                node.menuItemTemplate = "menuItem"; // NOTE: workaround for https://isc.devexpress.com/Thread/WorkplaceDetails/T429632
            }
        }
    });
    return result;
}; };
export var patchImmediatePostData = function (imediatePostDataProperties) { return function (config) {
    var result = traverse.forEach(config, function (val) {
        if (isString(val) && val.startsWith("$local")) {
            var imediatePostData = imediatePostDataProperties.filter(function (v) { return val.indexOf(v) !== -1; })[0];
            if (imediatePostData) {
                return val.replace(detailModelProperty.currentObjPropName + "." + imediatePostData, imediatePostData + "Value");
            }
        }
        return;
    });
    return result;
}; };
export var patchView = function (deviceType) {
    var listViewPatcher = continueFunc(getListView(deviceType), patchConfig(deviceType)), detailViewPatcher = continueFunc(getDetailView, patchConfig(deviceType));
    return function (config) {
        if (!config.type) {
            throw new Error("View has no type: \"" + config.id + "\"");
        }
        var patcher;
        if (config.type === viewTypes.listView) {
            patcher = listViewPatcher;
        }
        else {
            patcher = detailViewPatcher;
            var imediatePostDataProperties = config.imediatePostDataProperties;
            if (imediatePostDataProperties && imediatePostDataProperties.length) {
                patcher = continueFunc(patcher, patchImmediatePostData(imediatePostDataProperties));
            }
        }
        return patcher(config);
    };
};
