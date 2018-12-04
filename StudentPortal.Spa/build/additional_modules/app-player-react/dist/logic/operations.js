/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
var AppPlayerError = /** @class */ (function (_super) {
    tslib_1.__extends(AppPlayerError, _super);
    function AppPlayerError(message, prototype) {
        if (prototype === void 0) { prototype = AppPlayerError.prototype; }
        var _this = _super.call(this, message) || this;
        _this.message = message;
        // NOTE: https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
        Object.setPrototypeOf(_this, prototype);
        return _this;
    }
    return AppPlayerError;
}(Error));
export { AppPlayerError };
var LogicError = /** @class */ (function (_super) {
    tslib_1.__extends(LogicError, _super);
    function LogicError(message, callerInfo) {
        var _this = _super.call(this, message, LogicError.prototype) || this;
        _this.callerInfo = callerInfo;
        return _this;
    }
    return LogicError;
}(AppPlayerError));
export { LogicError };
var DataLogicError = /** @class */ (function (_super) {
    tslib_1.__extends(DataLogicError, _super);
    function DataLogicError(data, callerInfo) {
        var _this = _super.call(this, data.responseText || data.message || "Unknown data error", DataLogicError.prototype) || this;
        _this.data = data;
        _this.callerInfo = callerInfo;
        return _this;
    }
    return DataLogicError;
}(AppPlayerError));
export { DataLogicError };
