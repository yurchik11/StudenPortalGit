/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import CustomStore from "devextreme/data/custom_store";
import $ from "../utils/jquery.stub";
var XappStore = /** @class */ (function (_super) {
    tslib_1.__extends(XappStore, _super);
    function XappStore(storeOptions, $global) {
        if ($global === void 0) { $global = null; }
        var _this = this;
        var resultOptions = tslib_1.__assign({}, storeOptions, { byKey: function (id) {
                var items = $global.appConf && $global.appConf[storeOptions.path], item = null;
                if (items) {
                    item = items.filter(function (item) { return item.id === id; })[0];
                }
                if (item) {
                    return $.Deferred().resolve(item).promise();
                }
                else {
                    return $.Deferred().reject("The item with id: '" + id + "' doesn't find in " + storeOptions.path).promise();
                }
            } });
        _this = _super.call(this, resultOptions) || this;
        return _this;
    }
    return XappStore;
}(CustomStore));
export default XappStore;
