/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import { continueFunc } from "../utils";
import dxArrayStore from "devextreme/data/array_store";
var ArrayStore = /** @class */ (function (_super) {
    tslib_1.__extends(ArrayStore, _super);
    function ArrayStore(storeOptions) {
        return _super.call(this, storeOptions) || this;
    }
    ArrayStore.prototype.byKey = function (key) {
        return _super.prototype.byKey.call(this, key)
            .then(function (value) {
            if (value instanceof Object) {
                return tslib_1.__assign({}, value); // TODO: comment reason
            }
            else {
                return value;
            }
        });
    };
    ArrayStore.prototype.load = function (loadOptions) {
        if (loadOptions === void 0) { loadOptions = {}; }
        loadOptions.select = continueFunc(function (data) {
            return tslib_1.__assign({}, data);
        }, loadOptions.select || (function (data) { return data; }));
        return _super.prototype.load.call(this, loadOptions);
    };
    return ArrayStore;
}(dxArrayStore));
export default ArrayStore;
