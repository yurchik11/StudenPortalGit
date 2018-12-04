/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import { baseModelProperty, detailModelProperty, listModelProperty } from "./views";
function getSelectionSourceWidgetProps($event) {
    var selectionSourceWidget = $event.component, selectedRowKeys = selectionSourceWidget.option("selectedRowKeys"), selectedItemKeys = selectionSourceWidget.option("selectedItemKeys");
    return { selectionSourceWidget: selectionSourceWidget, selectedRowKeys: selectedRowKeys, selectedItemKeys: selectedItemKeys };
}
function initCollectionContext(propertyName, $local) {
    if (propertyName) {
        $local[detailModelProperty.collectionContextsPropName][propertyName] = {};
    }
}
export function getCollectionContext(propertyName) {
    return propertyName
        ? function ($local) { return $local[detailModelProperty.collectionContextsPropName][propertyName]; }
        : function ($local) { return $local; };
}
export var createListView$codeFunctions = function (propertyName) {
    var collectionContextFn = getCollectionContext(propertyName);
    return {
        onInitialized: function (_a) {
            var $local = _a.$local, $event = _a.$event;
            initCollectionContext(propertyName, $local);
            if ($event) {
                var selectionSourceWidget = getSelectionSourceWidgetProps($event).selectionSourceWidget;
                collectionContextFn($local)[listModelProperty.selectionSourceWidget] = selectionSourceWidget;
            }
        },
        getViewState: function (_a) {
            var $local = _a.$local;
            return collectionContextFn($local)[baseModelProperty.viewState];
        },
        onGridSelectionChanged: function (_a) {
            var $local = _a.$local, $event = _a.$event;
            var selectedRowKeys = getSelectionSourceWidgetProps($event).selectedRowKeys;
            collectionContextFn($local)[listModelProperty.selectedItems] = selectedRowKeys;
        },
        onListSelectionChanged: function (_a) {
            var $local = _a.$local, $event = _a.$event;
            var selectedItemKeys = getSelectionSourceWidgetProps($event).selectedItemKeys;
            collectionContextFn($local)[listModelProperty.selectedItems] = selectedItemKeys;
        }
    };
};
